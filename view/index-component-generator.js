document.getElementById('studSearchBtn').addEventListener("click",() => {
    const studName = document.getElementById('studSearch').value;
    const studNamePart = document.getElementById('studSearch_namePart').value;

    const params = new URLSearchParams({
        type: 'GET_SEARCH_STUDNAME',
        studName: studName,
        studNamePart: studNamePart
    });

    loadingModal.show();

    fetch(`controller/index-post.php`,{
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
    })
    .then(res => res.json())
    .then(result => {
        console.log(result);

        const personInfoCard = document.getElementById("personInfoCard");
        personInfoCard.classList.add("person-record-section-form-hidden");

        const personTableCard = document.getElementById("searchResultSection");
        personTableCard.classList.remove("search-result-section-hide");

        const tbody = document.getElementById('searchStudResult');
        if(!result.length){
            tbody.innerHTML = `<tr><td colspan="6" class="text-center">No records found</td></tr>`;
        }else{
            tbody.innerHTML = "";
        }

        result.forEach(data => {
            const tr = document.createElement("tr");

            tr.innerHTML = `<td>${data.fullName}</td>
                            <td>${data.course}</td>
                            <td>${data.section}</td>
                            <td class="tdtable-action">
                                <button class="btn btn-table-hstry" data-stud-id="${data.studId}">History</button>
                                <button class="btn btn-table-new" data-stud-id="${data.studId}">New</button>
                            </td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => {
        loadingModal.hide();
    });
});

function STUDENT_INFO_CARD(stud_id){

    const params = new URLSearchParams({
        type: 'STUDENT_INFO_CARD',
        stud_id: stud_id
    })

    fetch(`controller/index-post.php`,{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
    })
    .then(res => res.json())
    .then(data => {
        const info_card = document.querySelector(".person-record-header");
        info_card.innerHTML = "";

        info_card.innerHTML = `
                    <div class="person-info-main">
                        <div class="person-img">
                            <img src="attachment/user.jpg" alt="user image" id="person_profile">
                        </div>
                        <div class="person-info">
                            <h3 class="person-info-fullname" 
                            data-lvl-id="${data.lvl_id}"
                            data-yr-id="${data.yr_id}"
                            data-prd-id="${data.prd_id}" 
                            data-stud-id="${data.studId}" id="info-fullname">${data.fullName}</h3>
                            <p class="person-info-grdSec">${data.course} (${data.section})</p>
                            <div class="person-info-ageGender">
                                <p>Age: ${data.bday}</p>
                                <p>Gender: ${data.gender}</p>
                            </div>
                        </div>
                    </div> 
                    <div>
                        <button type="button" class="btn-close" id="closeModalBtn"></button>
                    </div>`;
    })
    .catch(error => console.error('Error fetching data:', error));
};

function TRIAGE_HISTORY_LIST(stud_id){

    const params = new URLSearchParams({
        type: 'REC_HISTORY_LIST',
        studId: stud_id
    })

    fetch(`controller/index-post.php`,{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
    })
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector(".history-tbl");

        if(!data.length){
            tbody.innerHTML = `<tr class="text-center"><td>No record yet</td></tr>`;
        }else{
            tbody.innerHTML ="";
        }
        
        data.forEach(record => {
            const row = document.createElement("tr");

            row.innerHTML = `<td class="trig-hist-entry" 
                            data-stud-id="${record.stud_id}"
                            data-hist-id="${record.hist_id}"
                            data-stud-id="${data.stud_id}">
                                ${formatDate(record.hist_date)} ${formatTime(record.hist_time)}
                            </td>`;
            tbody.appendChild(row);

            document.addEventListener('click', function (e) {
                const cell = e.target.closest('.trig-hist-entry');
                if (!cell) return;

                const row = cell.closest('tr');
                if (!row) return;

                document.querySelectorAll('tr.highlighted').forEach(r => {
                    r.classList.remove('highlighted');
                    r.querySelectorAll('td').forEach(td => {
                    td.style.backgroundColor = '';
                    td.style.color = '';
                    });
                });

                row.classList.add('highlighted');
                row.querySelectorAll('td').forEach(td => {
                    td.style.backgroundColor = '#ffeeba';
                    td.style.color = '#000';
                });
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error))
};


document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    const button = e.target.closest(".btn-table-hstry"); 
    if (!button) return; 

    const stud_id = button.dataset.studId;
    console.log("Clicked button stud_id:", stud_id);

    const personInfoCard = document.getElementById("personInfoCard");
    personInfoCard.classList.remove("person-record-section-form-hidden");

    const personTableCard = document.getElementById("searchResultSection");
    personTableCard.classList.add("search-result-section-hide");

    STUDENT_INFO_CARD(stud_id);
    TRIAGE_HISTORY_LIST(stud_id);

    const params = new URLSearchParams({
        type: 'SHOW_TRIAGE_HISTORY',
        studId: stud_id
    })

    fetch(`controller/index-post.php`,{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
    })
    .then(res => res.json())
    .then(data => {
        const main_section = document.querySelector('.person-triage-info-record');

        main_section.innerHTML = "";
        main_section.innerHTML = `
                                <div id="triage-info-hist-record">
                                    <div class="triage-info-form-wrap">
                                        
                                        <div class="triage-info-form-pt1">
                                            <b>Time and Date of Visit</b>
                                            <div class="d-flex flex-row triage-info-hist-dateTime">
                                                <span class="triage-info-hist-date">Date: <span>${formatDate(data.hist_date)}</span></span>
                                                <span class="triage-info-hist-time">Time: <span>${formatTime(data.hist_time)}</span></span>
                                            </div>
                                            <div>
                                                <b>Reason for Clinic Visit</b>
                                                <p>${data.reason}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="triage-info-form-pt2">
                                            <b>Vitals</b>
                                            <div class="triage-info-vitals">
                                                <div class="triage-info-vitals1">
                                                    <div>
                                                        <span>BP: <span>${data.bp}</span></span>
                                                    </div>
                                                    <div>
                                                        <span>HR: <span>${data.hr}</span></span>
                                                    </div>
                                                </div>
                                                <div class="triage-info-vitals2">
                                                    <div>
                                                        <span>RR: <span>${data.rr}</span></span>
                                                    </div>
                                                    <div>
                                                        <span>O₂ SAT: <span>${data.o2sat}</span></span>
                                                    </div>
                                                </div>
                                                <div class="triage-info-vitals3">
                                                    <div>
                                                        <span>TEMP: <span>${data.temp}</span></span>
                                                    </div>
                                                    <div>
                                                        <span>Height: <span>${data.hght}</span></span>
                                                    </div>
                                                </div>
                                                <div class="triage-info-vitals4">
                                                    <div>
                                                        <span>Weight: <span>${data.wght}</span></span>
                                                    </div>
                                                    <div>
                                                        <span>BMI: <span>${data.bmi}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="triage-info-form-pt3">
                                            <b>History</b>
                                            <div>
                                                <span>Prior s/sx</span>
                                                <p>${data.prior}</p>
                                            </div>
                                            <div>
                                                <span>Present s/sx</span>
                                                <p>${data.present}</p>
                                            </div>
                                            <div>
                                                <span>Intervention</span>
                                                <p>${data.intervnt}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn new-record-btn" data-hist-id="${data.hist_id}" data-stud-id="${data.stud_id}">New Record</button>
                                </div>`;
    })
    .catch(error => console.error('Error fetching data:', error));
  });
});

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function(e){
        const button = e.target.closest(".trig-hist-entry"); 
        if (!button) return; 

        const hist_id = button.dataset.histId;
        const stud_id = button.dataset.studId;

        const params = new URLSearchParams({
            type: 'SHOW_HISTORY_FROM_LIST',
            studId: stud_id,
            histId: hist_id
        })

        fetch(`controller/index-post.php`,{
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params
        })
        .then(res => res.json())
        .then(data => {
            console.log("Success: ", data);
            const main_section = document.querySelector('.person-triage-info-record');

            main_section.innerHTML = "";
            main_section.innerHTML = `
                                    <div id="triage-info-hist-record">
                                        <div class="triage-info-form-wrap">
                                            
                                            <div class="triage-info-form-pt1">
                                                <b>Time and Date of Visit</b>
                                                <div class="d-flex flex-row triage-info-hist-dateTime">
                                                    <span class="triage-info-hist-date">Date: <span>${formatDate(data.hist_date)}</span>
                                                    <span class="triage-info-hist-time">Time: <span>${formatTime(data.hist_time)}</span></span>
                                                </div>
                                                <div>
                                                    <b>Reason for Clinic Visit</b>
                                                    <p>${data.reason}</p>
                                                </div>
                                            </div>
                                            
                                            <div class="triage-info-form-pt2">
                                                <b>Vitals</b>
                                                <div class="triage-info-vitals">
                                                    <div class="triage-info-vitals1">
                                                        <div>
                                                            <span>BP: <span>${data.bp}</span></span>
                                                        </div>
                                                        <div>
                                                            <span>HR: <span>${data.hr}</span></span>
                                                        </div>
                                                    </div>
                                                    <div class="triage-info-vitals2">
                                                        <div>
                                                            <span>RR: <span>${data.rr}</span></span>
                                                        </div>
                                                        <div>
                                                            <span>O₂ SAT: <span>${data.o2sat}</span></span>
                                                        </div>
                                                    </div>
                                                    <div class="triage-info-vitals3">
                                                        <div>
                                                            <span>TEMP: <span>${data.temp}</span></span>
                                                        </div>
                                                        <div>
                                                            <span>Height: <span>${data.hght}</span></span>
                                                        </div>
                                                    </div>
                                                    <div class="triage-info-vitals4">
                                                        <div>
                                                            <span>Weight: <span>${data.wght}</span></span>
                                                        </div>
                                                        <div>
                                                            <span>BMI: <span>${data.bmi}</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="triage-info-form-pt3">
                                                <b>History</b>
                                                <div>
                                                    <span>Prior s/sx</span>
                                                    <p>${data.prior}</p>
                                                </div>
                                                <div>
                                                    <span>Present s/sx</span>
                                                    <p>${data.present}</p>
                                                </div>
                                                <div>
                                                    <span>Intervention</span>
                                                    <p>${data.intervnt}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn new-record-btn" data-hist-id="${data.hist_id}" data-stud-id="${data.stud_id}">New Record</button>
                                    </div>
                                `;
        })
        .catch(error => console.error('Error fetching data:', error))
    
    })
});

document.addEventListener("DOMContentLoaded", () =>{
    document.addEventListener("click", function (e){
        const button = e.target.closest(".btn-table-new"); 
        if (!button) return;

        const stud_id = button.dataset.studId;
        const personInfoCard = document.getElementById("personInfoCard");
        personInfoCard.classList.remove("person-record-section-form-hidden");

        const personTableCard = document.getElementById("searchResultSection");
        personTableCard.classList.add("search-result-section-hide");

        STUDENT_INFO_CARD(stud_id);
        TRIAGE_HISTORY_LIST(stud_id);

        const params = new URLSearchParams({
            type: "CHECK_PRIOR_SSX",
            studId: stud_id
        })

        fetch(`controller/index-post.php`,{
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params
        })
        .then(res => res.json())
        .then(data => {

            const main_section = document.querySelector('.person-triage-info-record');
            const dateToday = new Date().toISOString().split('T')[0];
            const timeNow = new Date().toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" });

            let priorSsx ="";

            if(data == null){
                priorSsx = `<input type="hidden" name="prior" value="First entry">`;
            }else{
                console.log('initial entry: ', data.prior, " ", data.present);
                priorSsx = `<span>Prior s/sx</span>
                        <p>${data.present}</p>
                        <input type="hidden" name="prior" value="${data.present}">`;
            }
            
            main_section.innerHTML = "";
            main_section.innerHTML = `
                            <form class="triage-form" id="triage-info-form">
                                <div class="triage-info-form-wrap">

                                    <div class="triage-info-form-pt1">
                                        <b>Time and Date of Visit</b>
                                        <div class="d-flex flex-row">
                                            <label for="triageInfoForm_date" class="form-label">Date</label>
                                            <input type="date" class="form-control form-date" id="triageInfoForm_date" name="visit_date" value="${dateToday}" required>

                                            <label for="triageInfoForm_time" class="form-label">Time<span
                                                class="text-danger">*</span></label>
                                            <input type="time" class="form-control form-time" id="triageInfoForm_time" name="visit_time" value="${timeNow}" required>
                                        </div>
                                        <div>
                                            <label for="triageInfoForm_reason" class="form-label form-label-reason">Reason for Clinic Visit<span
                                                class="text-danger">*</span></label>
                                            <textarea class="form-control form-reason" id="triageInfoForm_reason" aria-describedby="visitReason" name="visit_reason" required></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="triage-info-form-pt2">
                                        <b>Vitals</b>
                                        <div class="triage-info-vitals">
                                            <div class="triage-info-vitals1">
                                                <div>
                                                    <label for="vit_bp">BP:</label>
                                                    <input type=text id="vit_bp" class="line-input vital-input" name="bp">
                                                </div>
                                                <div>
                                                    <label for="vit_hr">HR:</label>
                                                    <input type=text id="vit_hr" class="line-input vital-input" name="hr">
                                                </div>
                                            </div>
                                            <div class="triage-info-vitals2">
                                                <div>
                                                    <label for="vit_rr">RR:</label>
                                                    <input type=text id="vit_rr" class="line-input vital-input" name="rr">
                                                </div>
                                                <div>
                                                    <label for="vit_O2">O₂ SAT:</label>
                                                    <input type=text id="vit_O2" class="line-input vital-input" name="vitO2">
                                                </div>
                                            </div>
                                            <div class="triage-info-vitals3">
                                                <div>
                                                    <label for="vit_temp">TEMP:</label>
                                                    <input type=text id="vit_temp" class="line-input vital-input" name="temp">
                                                </div>
                                                <div>
                                                    <label for="vit_ht">Height:</label>
                                                    <input type=text id="vit_ht" class="line-input vital-input" name="hght">
                                                </div>
                                            </div>
                                            <div class="triage-info-vitals4">
                                                <div>
                                                    <label for="vit_wt">Weight:</label>
                                                    <input type=text id="vit_wt" class="line-input vital-input" name="wght">
                                                </div>
                                                <div>
                                                    <label for="vit_bmi">BMI:</label>
                                                    <input type=text id="vit_bmi" class="line-input vital-input" name="bmi">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="triage-info-form-pt3">
                                        <b>History</b>
                                        <div class="prior-record">
                                            ${priorSsx}
                                        </div>
                                        <div>
                                            <label for="triageInfoForm_present" class="form-label">Present s/sx</label>
                                            <textarea class="form-control form-present" id="triageInfoForm_present" aria-describedby="visitReason" name="present"></textarea>
                                        </div>
                                        <div>
                                            <label for="triageInfoForm_interv" class="form-label">Intervention</label>
                                            <textarea class="form-control form-interv" id="triageInfoForm_interv" aria-describedby="visitReason" name="interv"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="triage-info-form-confirm">
                                    <input type="checkbox" id="confirm_new_record" value="1" name="confirm_new_record" required>
                                    <label for="confirm_new_record">I confirm the information above is correct</label>
                                </div>
                                <button type="submit" class="btn submit-btn" id="submit_new_rcrd_btn" disabled>Submit</button>
                            </form>`;
                            
            document.getElementById('confirm_new_record').addEventListener("change",function(){
                document.getElementById('submit_new_rcrd_btn').disabled = !this.checked;
            });
            FORM_SUBMIT();
        })
        .catch(error => console.error('Error fetching data:', error));
    })
});

document.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener("click",function(e){
        const newRecBttn = e.target.closest(".new-record-btn");
        if(!newRecBttn) return;

        const stud_id = newRecBttn.dataset.studId;

        document.querySelectorAll('tr.highlighted').forEach(r => {
            r.classList.remove('highlighted');
            r.querySelectorAll('td').forEach(td => {
            td.style.backgroundColor = '';
            td.style.color = '';
            });
        });

        const params = new URLSearchParams({
            type: "CHECK_PRIOR_SSX",
            studId: stud_id
        })
         fetch(`controller/index-post.php`,{
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params
        })
        .then(res => res.json())
        .then(data => {

            const main_section = document.querySelector('.person-triage-info-record');
            const dateToday = new Date().toISOString().split('T')[0];
            const timeNow = new Date().toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" });

            let priorSsx ="";

            if(data == null){
                priorSsx = `<input type="hidden" name="prior" value="First entry">`;
            }else{
                console.log('initial entry: ', data.prior, " ", data.present);
                priorSsx = `<span>Prior s/sx</span>
                        <p>${data.present}</p>
                        <input type="hidden" name="prior" value="${data.present}">`;
            }
            
            main_section.innerHTML = "";
            main_section.innerHTML = `
                            <form class="triage-form" id="triage-info-form">
                                <div class="triage-info-form-wrap">

                                    <div class="triage-info-form-pt1">
                                        <b>Time and Date of Visit</b>
                                        <div class="d-flex flex-row">
                                            <label for="triageInfoForm_date" class="form-label">Date</label>
                                            <input type="date" class="form-control form-date" id="triageInfoForm_date" name="visit_date" value="${dateToday}" required>

                                            <label for="triageInfoForm_time" class="form-label">Time<span
                                                class="text-danger">*</span></label>
                                            <input type="time" class="form-control form-time" id="triageInfoForm_time" name="visit_time" value="${timeNow}" required>
                                        </div>
                                        <div>
                                            <label for="triageInfoForm_reason" class="form-label form-label-reason">Reason for Clinic Visit<span
                                                class="text-danger">*</span></label>
                                            <textarea class="form-control form-reason" id="triageInfoForm_reason" aria-describedby="visitReason" name="visit_reason" required></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="triage-info-form-pt2">
                                        <b>Vitals</b>
                                        <div class="triage-info-vitals">
                                            <div class="triage-info-vitals1">
                                                <div>
                                                    <label for="vit_bp">BP:</label>
                                                    <input type=text id="vit_bp" class="line-input vital-input" name="bp">
                                                </div>
                                                <div>
                                                    <label for="vit_hr">HR:</label>
                                                    <input type=text id="vit_hr" class="line-input vital-input" name="hr">
                                                </div>
                                            </div>
                                            <div class="triage-info-vitals2">
                                                <div>
                                                    <label for="vit_rr">RR:</label>
                                                    <input type=text id="vit_rr" class="line-input vital-input" name="rr">
                                                </div>
                                                <div>
                                                    <label for="vit_O2">O₂ SAT:</label>
                                                    <input type=text id="vit_O2" class="line-input vital-input" name="vitO2">
                                                </div>
                                            </div>
                                            <div class="triage-info-vitals3">
                                                <div>
                                                    <label for="vit_temp">TEMP:</label>
                                                    <input type=text id="vit_temp" class="line-input vital-input" name="temp">
                                                </div>
                                                <div>
                                                    <label for="vit_ht">Height:</label>
                                                    <input type=text id="vit_ht" class="line-input vital-input" name="hght">
                                                </div>
                                            </div>
                                            <div class="triage-info-vitals4">
                                                <div>
                                                    <label for="vit_wt">Weight:</label>
                                                    <input type=text id="vit_wt" class="line-input vital-input" name="wght">
                                                </div>
                                                <div>
                                                    <label for="vit_bmi">BMI:</label>
                                                    <input type=text id="vit_bmi" class="line-input vital-input" name="bmi">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="triage-info-form-pt3">
                                        <b>History</b>
                                        <div class="prior-record">
                                            ${priorSsx}
                                        </div>
                                        <div>
                                            <label for="triageInfoForm_present" class="form-label">Present s/sx</label>
                                            <textarea class="form-control form-present" id="triageInfoForm_present" aria-describedby="visitReason" name="present"></textarea>
                                        </div>
                                        <div>
                                            <label for="triageInfoForm_interv" class="form-label">Intervention</label>
                                            <textarea class="form-control form-interv" id="triageInfoForm_interv" aria-describedby="visitReason" name="interv"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="triage-info-form-confirm">
                                    <input type="checkbox" id="confirm_new_record" value="1" name="confirm_new_record" required>
                                    <label for="confirm_new_record">I confirm the information above is correct</label>
                                </div>
                                <button type="submit" class="btn submit-btn" id="submit_new_rcrd_btn" disabled>Submit</button>
                            </form>`;
                            
            document.getElementById('confirm_new_record').addEventListener("change",function(){
                document.getElementById('submit_new_rcrd_btn').disabled = !this.checked;
            });
            FORM_SUBMIT();
        })
        .catch(error => console.error('Error fetching data:', error));
    })
});