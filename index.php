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

                <div class="table-body-scroll">
                <table class="table table-bordered fixed-header">
                    <thead>
                        <tr class="search-result-tbl-tr">
                        <td>Full Name</td>
                        <td>Course/Program</td>
                        <td>Year Level & Section</td>
                        <td class="thtable-action">Action</td>
                        </tr>
                    </thead>
                <!-- Scrollable tbody wrapper -->
                        <tbody id="searchStudResult">
                            <tr>
                                <td colspan="5" class="text-center">
                                    <span class="no-result-msg">Search result goes here</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                        <table class="table table-bordered table-hover fixed-header">
                            <thead>
                                <tr>
                                    <td style="background-color: #181a46;
                                            color: white;
                                            font-weight: bold;
                                            margin-bottom:0;">History</td>
                                </tr>
                            </thead>
                        </table>
                        
                        <div class="tableHist-body-scroll">
                            <table class="table table-bordered table-hover fixed-header">
                                <tbody class="history-tbl">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="person-triage-info-record">
                        
                    </div>
                </div>
            </div>
        </section>
        <!-- End of person new records -->

        <div id="autoDiv" class="alert-box">
        Record saved successfully!
        </div>

    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="view/index-function.js?t=<?php echo time();?>"></script>
    <script src="view/index-component-generator.js?t=<?php echo time();?>"></script>
</html>