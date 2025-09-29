function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(hour, minute);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options); 
}

const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'),{
    backdrop: 'static',
    keyboard: false
});

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function(e){
        const closeBttn = e.target.closest(".btn-close"); 
        if (!closeBttn) return;

        const personInfoCard = document.getElementById("personInfoCard");
        personInfoCard.classList.add("person-record-section-form-hidden");

        const personTableCard = document.getElementById("searchResultSection");
        personTableCard.classList.remove("search-result-section-hide");

    })
});

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

            form.reset();

            refreshPriorSsx(stud_id);

            const dateToday = new Date().toISOString().split('T')[0];
            const timeNow = new Date().toLocaleTimeString('en-GB', { 
                hour: "2-digit", 
                minute: "2-digit" 
            });

            document.getElementById("triageInfoForm_date").value = dateToday;
            document.getElementById("triageInfoForm_time").value = timeNow;

            const confirmBox = document.getElementById("confirm_new_record");
            const submitBtn = document.getElementById("submit_new_rcrd_btn");

            if (confirmBox) {
                confirmBox.checked = false;
            }
            if (submitBtn) {
                submitBtn.disabled = true;
            }
            showDiv("Record saved!", 3000);

        })
        .catch(error => console.error('Error fetching data:', error));
    });
}

function refreshPriorSsx(stud_id){
    const params = new URLSearchParams({
        type: "CHECK_PRIOR_SSX",
        studId: stud_id
    });

    fetch(`controller/index-post.php`,{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
    })
    .then(res => res.json())
    .then(data => {
        const priorContainer = document.querySelector(".prior-record");
        let priorSsx = "";

        if(data == null){
            priorSsx = `<input type="hidden" name="prior" value="First entry">`;
        } else {
            priorSsx = `<span>Prior s/sx</span>
                        <p>${data.present}</p>
                        <input type="hidden" name="prior" value="${data.present}">`;
        }

        priorContainer.innerHTML = priorSsx;
        TRIAGE_HISTORY_LIST(stud_id)
    })
    .catch(error => console.error("Error refreshing prior:", error));
}

function showDiv(message = "Record saved successfully!", duration = 3000) {
  const div = document.getElementById("autoDiv");
  div.textContent = message;

  div.classList.add("show");

  setTimeout(() => {
    div.classList.remove("show");

    setTimeout(() => {
      div.style.display = "none";
    }, 500);
  }, duration);
}
