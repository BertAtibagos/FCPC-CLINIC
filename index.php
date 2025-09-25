<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="css/stylesheet.css">
    </head>
    <body>
        <!-- Start of Search menu -->
        <div class="searchStudent">
            <input class="form-control mr-sm-2 searchStudent-name" type="search" placeholder="Search" aria-label="Search"  id="studSearch" name="studSearch">
            <select class="form-select searchStudent-full-name" id="studSearch_namePart">
                <option selected value="lname">Last Name</option>
                <option value="fname">First Name</option>
                <option value="mname">Middle Name</option>
            </select>
            <!-- <select class="form-select searchStudent-Catg">
                <option selected disabled value="3">All</option>
                <option value="2">Student</option>
                <option value="1">Employee</option>
            </select> -->
            <button class="btn my-2 my-sm-0 srch-btn" id="studSearchBtn">Search</button>
        </div>
        <!-- End of Search menu -->

        <div class="modal fade" id="loadingModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center p-4">
            <div class="modal-body">
                <!-- Bootstrap spinner -->
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Loading, please wait...</p>
            </div>
            </div>
        </div>
        </div>

        <!-- Start of Search Result table-->
        <section class="search-result-section" id="searchResultSection">
            <div class="search-result card">
                <h3>TRIAGE RECORDS</h3>
                <table class="table table-bordered">
                    <thead>
                        <tr class="search-result-tbl-tr">
                            <td>Full Name</td>
                            <td>Course/Program</td>
                            <td>Year Level & Section</td>
                            <td class="thtable-action">Action</td>
                        </tr>
                    </thead>
                    <tbody id="searchStudResult">
                        <tr>
                            <td colspan="5" class="text-center">
                                <span class="no-result-msg">Search result goes here</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <!-- End of Search Result table-->

        <!-- Start of person new records -->
        <section class="person-record-section-form person-record-section-form-hidden" id="personInfoCard">
            <div class="person-record card">
                <div class="person-record-header">
                </div>

                <div class="person-triage-info">
                    <div class="person-triage-info-history">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td>History</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08-23-2000 12:00 PM</td>
                                </tr>
                                <tr>
                                    <td>12-25-2012 12:00 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="person-triage-info-record">
                        
                    </div>
                </div>
            </div>
        </section>

        <div id="autoDiv" class="alert-box">
        Record saved successfully!
        </div>

        <!-- End of person new records -->

        <!-- Start of person history records -->
        <!-- <section class="person-record-section">
            <div class="person-record card">
                <div class="person-record-header">
                    <div class="person-img">
                        <img src="attachment/user.jpg" alt="user image" id="person_profile">
                    </div>
                    <div class="person-info">
                        <h3 class="person-info-fullname">Robert Galapin Atibagos</h3>
                        <p class="person-info-grdSec">Doctorate of Undergraduate of Masters of Bachelors of Science in High Information Technology (DUMBSHIT 1A)</p>
                        <div class="person-info-ageGender">
                            <p>Age: 25</p>
                            <p>Gender: Male</p>
                        </div>
                    </div>
                </div>

                <div class="person-triage-info">
                    <div class="person-triage-info-history">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td>History</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08-23-2000 12:00 PM</td>
                                </tr>
                                <tr>
                                    <td>12-25-2012 12:00 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="person-triage-info-record">
                        <div id="triage-info-hist-record">
                            <div class="triage-info-form-wrap">
                                
                                <div class="triage-info-form-pt1">
                                    <b>Time and Date of Visit</b>
                                    <div class="d-flex flex-row triage-info-hist-dateTime">
                                        <span class="triage-info-hist-date">Date: <span>09/15/2025</span></span>
                                        <span class="triage-info-hist-time">Time: <span>8:00 AM</span></span>
                                    </div>
                                    <div>
                                        <b>Reason for Clinic Visit</b>
                                        <p>Fatigue or extreme tiredness that doesn’t get better with rest</p>
                                    </div>
                                </div>
                                
                                <div class="triage-info-form-pt2">
                                    <b>Vitals</b>
                                    <div class="triage-info-vitals">
                                        <div class="triage-info-vitals1">
                                            <div>
                                                <span>BP: <span>120/70</span></span>
                                            </div>
                                            <div>
                                                <span>HR: <span>70</span></span>
                                            </div>
                                        </div>
                                        <div class="triage-info-vitals2">
                                            <div>
                                                <span>RR: <span>19 bpm</span></span>
                                            </div>
                                            <div>
                                                <span>O₂ SAT: <span>95%</span></span>
                                            </div>
                                        </div>
                                        <div class="triage-info-vitals3">
                                            <div>
                                                <span>TEMP: <span>40 C</span></span>
                                            </div>
                                            <div>
                                                <span>Height: <span>5'3</span></span>
                                            </div>
                                        </div>
                                        <div class="triage-info-vitals4">
                                            <div>
                                                <span>Weight: <span>69 Kg</span></span>
                                            </div>
                                            <div>
                                                <span>BMI: <span>25 </span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="triage-info-form-pt3">
                                    <b>History</b>
                                    <div>
                                        <span>Prior s/sx</span>
                                        <p>A white or red patch on the tongue or in patient's mouth</p>
                                    </div>
                                    <div>
                                        <span>Present s/sx</span>
                                        <p>Bleeding, pain, or numbness in the lip or mouth</p>
                                    </div>
                                    <div>
                                        <span>Intervention</span>
                                        <p>The patient is advised to pray 3x a week and hope for the best hehe</p>
                                    </div>
                                </div>
                            </div>
                            <button class="btn new-record-btn">New Record</button>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- End of person history records -->
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="view/index-function.js?t=<?php echo time();?>"></script>
</html>