<?php
require("../configuration/connection.php");

$type = $_POST['type'];

$fetch = null;

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
            schl_admiss.`SchlStud_ID` AS studId,
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

if($type == 'CHECK_PRIOR_SSX'){

    $studId = $_POST['studId'];

    $qry = "SELECT clinic_hist.`SchlStudCliHis_priorssx` AS prior,
                    clinic_hist.`SchlStudCliHis_presentssx` AS present
            FROM `schoolstudentclinichistory` AS clinic_hist
            WHERE clinic_hist.`schlstud_ID` = ?
            AND clinic_hist.`SchlStudCliHis_ID` = (
                SELECT MAX(inner_hist.`SchlStudCliHis_ID`)
                FROM `schoolstudentclinichistory` AS inner_hist
                WHERE inner_hist.`schlstud_ID` = ?
                LIMIT 1
            )";

    $stmt = $dbPortal->prepare($qry); 
    $stmt->bind_param("ii",$studId,$studId);
    $stmt->execute();
    $result = $stmt->get_result();
    $fetch = $result->fetch_assoc();
    $stmt->close();
    $dbPortal->close();
}

if ($type == 'NEW_CLNC_REC') {
    $visitDate   = $_POST['visit_date'];
    $visitTime   = $_POST['visit_time'];
    $visitReason = $_POST['visit_reason'];
    $bp          = $_POST['bp'];
    $hr          = $_POST['hr'];
    $rr          = $_POST['rr'];
    $vito2       = $_POST['vitO2'];
    $temp        = $_POST['temp'];
    $height      = $_POST['hght'];
    $weight      = $_POST['wght'];
    $bmi         = $_POST['bmi'];
    $prior       = $_POST['prior'];
    $prsnt       = $_POST['present'];
    $interv      = $_POST['interv'];
    $isActive    = 1;
    $status      = 1;
    $studId      = $_POST['stud_ID'];
    $lvlId       = $_POST['lvl_ID'];
    $yrId        = $_POST['yr_ID'];
    $prdId       = $_POST['prd_ID'];

    $qry = "
        INSERT INTO `schoolstudentclinichistory` (
            `SchlStudCliHis_date`,
            `SchlStudCliHis_time`,
            `SchlStudCliHis_reason`,
            `SchlStudCliHis_BP`,
            `SchlStudCliHis_HR`,
            `SchlStudCliHis_RR`,
            `SchlStudCliHis_O2SAT`,
            `SchlStudCliHis_temp`,
            `SchlStudCliHis_height`,
            `SchlStudCliHis_weight`,
            `SchlStudCliHis_BMI`,
            `SchlStudCliHis_priorssx`,
            `SchlStudCliHis_presentssx`,
            `SchlStudCliHis_intervention`,
            `SchlStudCliHis_ISACTIVE`,
            `SchlStudCliHis_STATUS`,
            `schlstud_ID`,
            `schlacadlvl_ID`,
            `schlacadyr_ID`,
            `schlacadprd_ID`
        ) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    $stmt = $dbPortal->prepare($qry);

    $stmt->bind_param(
        "ssssssssssssssiiiiii",
        $visitDate,   
        $visitTime,  
        $visitReason, 
        $bp,          
        $hr,          
        $rr,          
        $vito2,       
        $temp,        
        $height,      
        $weight,      
        $bmi,         
        $prior,      
        $prsnt,       
        $interv,      
        $isActive,    
        $status,      
        $studId,      
        $lvlId,       
        $yrId,        
        $prdId   
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "insert_id" => $stmt->insert_id]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
    $dbPortal->close();
    exit;
}

if($type == 'REC_HISTORY_LIST'){
    $studId = $_POST['studId'];

    $qry = "SELECT 
                clinic_hist.`SchlStudCliHis_date` AS hist_date,
                clinic_hist.`SchlStudCliHis_time` AS hist_time,
                clinic_hist.`SchlStudCliHis_ID` AS hist_id,
                clinic_hist.`schlstud_ID` AS stud_id
            FROM
                `schoolstudentclinichistory` AS clinic_hist 
            WHERE clinic_hist.`schlstud_ID` = ?
            ";

    $stmt = $dbPortal->prepare($qry); 
    $stmt->bind_param("i",$studId);
    $stmt->execute();
    $result = $stmt->get_result();
    $fetch = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    $dbPortal->close();
}

if($type == 'SHOW_TRIAGE_HISTORY'){
    $studId = $_POST['studId'];

    $latestRec = "AND clinic_hist.`SchlStudCliHis_ID` = 
                (SELECT 
                    MAX(inner_hist.`SchlStudCliHis_ID`) 
                FROM
                    `schoolstudentclinichistory` AS inner_hist 
                WHERE inner_hist.`schlstud_ID` = ? 
                LIMIT 1)";

    $qry = "SELECT 
                clinic_hist.`SchlStudCliHis_date` AS hist_date,
                clinic_hist.`SchlStudCliHis_time` AS hist_time,
                clinic_hist.`SchlStudCliHis_reason` AS reason,
                clinic_hist.`SchlStudCliHis_BP` AS bp,
                clinic_hist.`SchlStudCliHis_HR` AS hr,
                clinic_hist.`SchlStudCliHis_RR` AS rr,
                clinic_hist.`SchlStudCliHis_O2SAT` AS o2sat,
                clinic_hist.`SchlStudCliHis_temp` AS temp,
                clinic_hist.`SchlStudCliHis_height` AS hght,
                clinic_hist.`SchlStudCliHis_weight` AS wght,
                clinic_hist.`SchlStudCliHis_BMI` AS bmi,
                clinic_hist.`SchlStudCliHis_priorssx` AS prior,
                clinic_hist.`SchlStudCliHis_presentssx` AS present,
                clinic_hist.`SchlStudCliHis_intervention` AS intervnt,
                clinic_hist.`SchlStudCliHis_ID` AS hist_id,
                clinic_hist.`schlstud_ID` AS stud_id
            FROM
                `schoolstudentclinichistory` AS clinic_hist 
            WHERE clinic_hist.`schlstud_ID` = ?
            $latestRec
           ";

    $stmt = $dbPortal->prepare($qry); 
    $stmt->bind_param("ii",$studId,$studId);
    $stmt->execute();
    $result = $stmt->get_result();
    $fetch = $result->fetch_assoc();
    $stmt->close();
    $dbPortal->close();
}

echo json_encode($fetch);
?>