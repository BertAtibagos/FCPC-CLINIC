const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
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
        tbody.innerHTML = "";

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

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    const button = e.target.closest(".btn-table-hstry"); 
    if (!button) return; // not our button, ignore

    const stud_id = button.dataset.studId;
    console.log("Clicked button stud_id:", stud_id);

    const personInfoCard = document.getElementById("personInfoCard");
    personInfoCard.classList.remove("person-record-section-form-hidden");

    const personTableCard = document.getElementById("searchResultSection");
    personTableCard.classList.add("search-result-section-hide");

    STUDENT_INFO_CARD(stud_id);

  });
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
                            <form id="triage-info-form">
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
})

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
                    </div>`;
    })
    .catch(error => console.error('Error fetching data:', error));
}

function FORM_SUBMIT(){
    const form = document.getElementById('triage-info-form');
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const infoFullName = document.getElementById('info-fullname');
        const stud_id = infoFullName.dataset.studId;
        const lvl_id = infoFullName.dataset.lvlId;
        const yr_id = infoFullName.dataset.yrId;
        const prd_id = infoFullName.dataset.prdId;
        
        const formdata = new FormData(form);
        formdata.append("type", "NEW_CLNC_REC");
        formdata.append("stud_ID",stud_id);
        formdata.append("lvl_ID", lvl_id);
        formdata.append("yr_ID", yr_id);
        formdata.append("prd_ID", prd_id);

        fetch(`controller/index-post.php`,{
            method: "POST",
            body: formdata
        })
        .then(res => res.json())
        .then(data => {
            console.log("Success: ", data);

        })
        .catch(error => console.error('Error fetching data:', error));
    });
}
