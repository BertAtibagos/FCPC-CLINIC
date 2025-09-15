document.getElementById('confirm_new_record').addEventListener("change",function(){
    document.getElementById('submit_new_rcrd_btn').disabled = !this.checked;
});