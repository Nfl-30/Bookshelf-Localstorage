const STORAGE_KEY = "BOOKSHELF_APPS";
 
let BookshelfList = [];
 
function isStorageExist(){
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(BookshelfList);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
        BookshelfList = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composebookObject(Title,Author,Year,isComplete) {
   return {
       id: +new Date(),
       Title,
       Author,
       Year,
       isComplete
   };
}
 
function findBook(bookItemID) {
   for(book of BookshelfList){
       if(book.id === bookItemID)
           return book;
   }
   return null;
}
 
 
function findBookIndex(bookItemID) {
   let index = 0
   for (book of BookshelfList) {
       if(book.id === bookItemID)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromBookshelfList() {
    let listUnreadBook = document.getElementById(INCOMPLETE_BOOK_LIST_ID);
    let listreadCompleteBook = document.getElementById(COMPLETED_BOOK_LIST_ID);
  
  
    for(book of BookshelfList){
        const newBook = makeBook(book.Title, book.Author, book.Year, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isComplete){
            listreadCompleteBook.append(newBook);
        } else{
            listUnreadBook.append(newBook);
        }
    }
 }