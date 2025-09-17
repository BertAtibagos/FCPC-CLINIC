document.getElementById('confirm_new_record').addEventListener("change",function(){
    document.getElementById('submit_new_rcrd_btn').disabled = !this.checked;
});

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
        const tbody = document.getElementById('searchStudResult');
        tbody.innerHTML = "";

        result.forEach(data => {
            const tr = document.createElement("tr");

            tr.innerHTML = `<td>${data.fullName}</td>
                            <td>${data.course}</td>
                            <td>${data.section}</td>
                            <td class="tdtable-action">
                                <button class="btn btn-table-hstry">History</button>
                                <button class="btn btn-table-new">New</button>
                            </td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error))
    .finally(() => {
        loadingModal.hide();
    });
});
// fetch("https://cataas.com/cat?json=true")
// .then(res => res.json())
// .then(data =>{
//     document.getElementById('person_profile').src = data.url ;
// });

