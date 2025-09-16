<?php
require("../configuration/connection.php");

$type = $_POST['type'];

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
            schl_sec.`SchlAcadSec_DESC` AS section
            FROM (
                SELECT DISTINCT
                    schl_ass.`SchlStud_ID` AS stud_id
                FROM `schoolenrollmentassessment` AS schl_ass
                WHERE schl_ass.`SchlEnrollAss_STATUS` = 1
            ) AS assStud_id

            LEFT JOIN `schoolstudent` AS schl_stud
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
            ON schl_admiss.`SchlAcadCrses_ID` = schl_course.`SchlAcadCrses_ID`

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
echo json_encode($fetch); 
?>