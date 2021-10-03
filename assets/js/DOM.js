const INCOMPLETE_BOOK_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST_ID = "completeBookshelfList"; 
const BOOK_ITEMID = 'itemId'

function addBook() {
    const uncompletedBookList = document.getElementById(INCOMPLETE_BOOK_LIST_ID);
    const completedBookList = document.getElementById(COMPLETED_BOOK_LIST_ID);

    const textTitle = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const textYear = document.getElementById("inputBookYear").value;
    const isChecked = document.getElementById("inputBookIsComplete").checked;

    let fulllog={
        id:+new Date(),
        title:textTitle,
        author:textAuthor,
        year:textYear,
        isChecked:isChecked
    }

    console.log(fulllog);

    const book = makeBook(textTitle,textAuthor,textYear,isChecked);
    const bookObject = composebookObject(textTitle,textAuthor,textYear,isChecked);

    book[BOOK_ITEMID] = bookObject.id;
    BookshelfList.push(bookObject);
    if(isChecked === false){
        uncompletedBookList.append(book)
    }
    else{
        completedBookList.append(book)
    }
    updateDataToStorage();
}


//1
function makeBook(bookTitle,bookAuthor,bookYear,isComplete) {
    //1
    const textTitle = document.createElement("h3");
    textTitle.innerText = bookTitle;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = bookAuthor;
    textAuthor.classList.add("Pengarang");

    const textYear = document.createElement("p");
    textYear.innerText = bookYear;
    textYear.classList.add("Tahun");

    const action = document.createElement("div");
    action.classList.add("action")

    if(isComplete === false){
        action.append(createButtonGreenHaveRead(), createButtonRed());
    }
    else if(isComplete === true){
        action.append(createButtonGreenHaveNotRead(), createButtonRed());
    }

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item")
    textContainer.append(textTitle, textAuthor, textYear, action);
    
    return textContainer;
}

//3
function createButton(buttonTypeClass, buttonText, eventListener){
    const button = document.createElement("button")
    button.classList.add(buttonTypeClass)
    button.innerText = buttonText

    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

//4
function createButtonGreenHaveRead(){
    return createButton("green", "Selesai Dibaca", function(event){
        addBooktoRead(event.target.parentElement.parentElement);
    });
}

function createButtonGreenHaveNotRead(){
    return createButton("green", "Belum Selesai Dibaca", function(event){
        addBooktoNotYetRead(event.target.parentElement.parentElement);
    });
}

//4
function createButtonRed(){
    return createButton("red", "Hapus Buku", function(event){
        deleteBook(event.target.parentElement.parentElement);
    });
}

function addBooktoRead(bookElement){
    const booklistCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > .Pengarang").innerText;
    const bookYear = bookElement.querySelector(".book_item > .Tahun").innerText;
    
    const bookToRead = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);

    book.isComplete = true;
    bookToRead[BOOK_ITEMID] = book.id
    
    booklistCompleted.append(bookToRead);
    bookElement.remove();

    updateDataToStorage();
}
function addBooktoNotYetRead(bookElement){
    const booklistCompleted = document.getElementById(INCOMPLETE_BOOK_LIST_ID);
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > .Pengarang").innerText;
    const bookYear = bookElement.querySelector(".book_item > .Tahun").innerText;
    

    const bookToNotYetRead = makeBook(bookTitle, bookAuthor, bookYear, false);
    
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isComplete = false;
    bookToNotYetRead[BOOK_ITEMID] = book.id
    
    booklistCompleted.append(bookToNotYetRead);
    bookElement.remove();

    updateDataToStorage();
}

//3
function deleteBook(bookElement){
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")){
        const bookPosition = findBookIndex[bookElement[BOOK_ITEMID]];
        BookshelfList.splice(bookPosition,1);

        bookElement.remove();
        updateDataToStorage();
    }
    else{
        alert('Buku tidak jadi dihapus')
    }
}

function searchBook() {
    let input, filter, art, a, i, txtValue;
    input = document.getElementById('searchBookTitle');
    filter = input.value.toUpperCase();
    art = document.querySelectorAll("article");
  
    for (i = 0; i < art.length; i++) {
        a = art[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        art[i].style.display = "";
      } else {
        art[i].style.display = "none";
      }
    }
  }

function resetsearchBook() {
    let input, filter, art, a, i, txtValue;
    input = document.getElementById('searchBookTitle');
    filter = input.value.toUpperCase();
    art = document.querySelectorAll("article");
  
    for (i = 0; i < art.length; i++) {
        art[i].style.display = "";
    }
  }