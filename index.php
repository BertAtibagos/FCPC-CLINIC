<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="css/stylesheet.css">
    </head>
    <body>
        <section>
            <!-- Start of Search menu -->
            <div class="searchStudent">
                <input class="form-control mr-sm-2 searchStudent-name" type="search" placeholder="Search" aria-label="Search"  id="studSearch" name="studSearch">
                <select class="form-select searchStudent-full-name">
                    <option selected value="lname">Last Name</option>
                    <option value="fname">First Name</option>
                    <option value="mname">Middle Name</option>
                </select>
                <select class="form-select searchStudent-Catg">
                    <option selected disabled value="3">All</option>
                    <option value="2">Student</option>
                    <option value="1">Employee</option>
                </select>
                <button class="btn btn-outline-primary my-2 my-sm-0" id="studSearchBtn">Search</button>
            </div>
            <!-- End of Search menu -->

            <!-- Start of Search Result table-->
            <!-- <div class="search-result card">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <td>Full Name</td>
                            <td>Course/Program</td>
                            <td>Year Level & Section</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Atibagos, Robert Galapin</td>
                            <td>Doctorate of Undergraduate of Masters of Bachelors of Science in High Information Technology </td>
                            <td>DUMBSHIT 1A</td>
                            <td><button class="btn btn-outline-primary">VIEW</button></td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
            <!-- End of Search Result table-->

            <!-- Start of person records -->
            <div class="person-record card">
                <div class="person-record-header">
                    <div class="person-img">
                        <img src="attachment/user.jpg" alt="user image">
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

                <div class="d-flex flex-row person-triage-info">
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
                        <form id="triage-info-form">
                            <p>Time and Date of Visit</p>
                            <div class="d-flex flex-row">
                                <label for="triageInfoForm_date" class="form-label">Date</label>
                                <input type="date" class="form-control" id="triageInfoForm_date">

                                <label for="triageInfoForm_time" class="form-label">Time</label>
                                <input type="time" class="form-control" id="triageInfoForm_time">
                            </div>
                            <div>
                                <label for="triageInfoForm_reason" class="form-label">Reason for Clinic Visit</label>
                                <textarea class="form-control" id="triageInfoForm_reason" aria-describedby="visitReason"></textarea>
                            </div>
                            <p>Vitals</p>
                            <div class="triage-info-vitals">
                                <div class="triage-info-vitals1">
                                    <div>
                                        <label for="vit_bp">BP:</label>
                                        <input type=text id="vit_bp" class="form-text vital-input">
                                    </div>
                                    <div>
                                        <label for="vit_hr">HR:</label>
                                        <input type=text id="vit_hr" class="form-text vital-input">
                                    </div>
                                </div>
                                <div class="triage-info-vitals2">
                                    <div>
                                        <label for="vit_rr">RR:</label>
                                        <input type=text id="vit_rr" class="form-text vital-input">
                                    </div>
                                    <div>
                                        <label for="vit_02">02 SAT:</label>
                                        <input type=text id="vit_02" class="form-text vital-input">
                                    </div>
                                    
                                </div>
                                <div class="triage-info-vitals3">
                                    <div>
                                        <label for="vit_temp">TEMP:</label>
                                        <input type=text id="vit_temp" class="form-text vital-input">
                                    </div>
                                    <div>
                                        <label for="vit_ht">Height:</label>
                                        <input type=text id="vit_ht" class="form-text vital-input">
                                    </div>
                                </div>
                                <div class="triage-info-vitals4">
                                    <div>
                                        <label for="vit_wt">Weight:</label>
                                        <input type=text id="vit_wt" class="form-text vital-input">
                                    </div>
                                    <div>
                                        <label for="vit_bmi">BMI:</label>
                                        <input type=text id="vit_bmi" class="form-text vital-input">
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- End of person records -->
        </section>
    </body>
</html>

