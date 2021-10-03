document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const lookForBook = document.getElementById('searchBook');

    lookForBook.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    });

    lookForBook.addEventListener("reset", function(event){
        event.preventDefault();
        resetsearchBook();    
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
    
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelfList();
 });