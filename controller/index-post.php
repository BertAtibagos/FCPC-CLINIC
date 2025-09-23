<?php
require("../configuration/connection.php");

$type = $_POST['type'];

$common_leftJoin = "LEFT JOIN `schoolstudent` AS schl_stud
            ON assStud_id.stud_id = schl_stud.`SchlStudSms_ID`

            LEFT JOIN `schoolenrollmentregistrationstudentinformation` AS schl_reg
            ON schl_stud.`SchlEnrollRegColl_ID` = schl_reg.`SchlEnrollReg_ID`

            LEFT JOIN `schoolenrollmentadmission` AS schl_admiss
            ON schl_reg.`SchlEnrollReg_ID` = schl_admiss.`SchlEnrollReg_ID`

            LEFT JOIN schoolenrollmentassessment AS schl_ass
            ON schl_admiss.`SchlEnrollAdmSms_ID` = schl_ass.`SchlEnrollAdm_ID`

            LEFT JOIN `schoolacademicsection` AS schl_sec
            ON schl_ass.`SchlAcadSec_ID` = schl_sec.`SchlAcadSecSms_ID`

            LEFT JOIN `schoolacademiccourses` AS schl_course
            ON schl_admiss.`SchlAcadCrses_ID` = schl_course.`SchlAcadCrses_ID`";


if($type == 'GET_SEARCH_STUDNAME'){

    $studName = $_POST['studName'];
    $studNamePart = $_POST['studNamePart'];

    $name_filter = null;

    switch($studNamePart){
        case "lname":
            $name_filter = "SchlEnrollRegStudInfo_LAST_NAME";
            break;
        case "fname":
            $name_filter = "SchlEnrollRegStudInfo_FIRST_NAME";
            break;
        case "mname":
            $name_filter = "SchlEnrollRegStudInfo_MIDDLE_NAME";
            break;
        default:
            error_log("Invalid name filter: " . $studNamePart);
            $name_filter = null;
            break;
    }

    $qry = "SELECT 
            CONCAT(
                SchlEnrollRegStudInfo_LAST_NAME, ', ', 
                SchlEnrollRegStudInfo_FIRST_NAME, ' ', 
                SchlEnrollRegStudInfo_MIDDLE_NAME) AS fullName,
            schl_course.`SchlAcadCrses_DESC` AS course,
            schl_sec.`SchlAcadSec_DESC` AS section,
            schl_admiss.`SchlStud_ID` AS studId
            FROM (
                SELECT DISTINCT
                    schl_ass.`SchlStud_ID` AS stud_id
                FROM `schoolenrollmentassessment` AS schl_ass
                WHERE schl_ass.`SchlEnrollAss_STATUS` = 1
            ) AS assStud_id

            $common_leftJoin

            WHERE $name_filter LIKE ?
            ORDER BY SchlEnrollRegStudInfo_LAST_NAME";

    $stmt = $dbPortal->prepare($qry);

    if ($stmt) {
        
        $srchStudName = "%" . $studName . "%";

        $stmt->bind_param("s",$srchStudName);
		$stmt->execute();
		$result = $stmt->get_result();
		$fetch = $result->fetch_all(MYSQLI_ASSOC);
		$stmt->close();
		$dbPortal->close();
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to prepare SQL statement."]);
    }
}

if($type == 'STUDENT_INFO_CARD'){
    $stud_id = $_POST['stud_id'];

    $qry = "SELECT 
            CONCAT(
                SchlEnrollRegStudInfo_FIRST_NAME, ' ', 
                SchlEnrollRegStudInfo_MIDDLE_NAME, ' ', 
                SchlEnrollRegStudInfo_LAST_NAME) AS fullName,
            schl_course.`SchlAcadCrses_DESC` AS course,
            schl_sec.`SchlAcadSec_DESC` AS section,
            schl_admiss.`SchlStud_ID` AS stud_id,
            schl_admiss.`SchlAcadYrLvl_ID` AS lvl_id,
            schl_admiss.`SchlAcadYr_ID` AS yr_id,
            schl_admiss.`SchlAcadPrd_ID` AS prd_id,
            TIMESTAMPDIFF(YEAR, schl_reg.`SchlEnrollRegStudInfo_BIRTH_DATE`, CURDATE()) AS bday,
            schl_reg.`SchlEnrollRegStudInfo_GENDER` AS gender
            FROM (
                SELECT DISTINCT
                    schl_ass.`SchlStud_ID` AS stud_id
                FROM `schoolenrollmentassessment` AS schl_ass
                WHERE schl_ass.`SchlEnrollAss_STATUS` = 1
            ) AS assStud_id
            
            $common_leftJoin

            WHERE schl_admiss.`SchlStud_ID` = ?";

    $stmt = $dbPortal->prepare($qry);
    $stmt->bind_param("i",$stud_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $fetch = $result->fetch_assoc();
    $stmt->close();
    $dbPortal->close();
}

// if($type == 'NEW_CLNC_REC'){

// }
echo json_encode($fetch);
?>