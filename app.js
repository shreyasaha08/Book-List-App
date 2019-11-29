class Book{
    constructor(title,author,price){
        this.title=title;
        this.author=author;
        this.price=price;

    }
}
class UI{
    static displayBooks(){
         
         const books = Store.getBooks();
         books.forEach(book => UI.addBookToList(book))
    }
    static addBookToList(book){
        const list = document.getElementById("book-list")

        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
}
static deleteBook(el){
    if(el.classList.contains("delete")){
        el.parentElement.parentElement.remove()
    }
}
static clearFields(){
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("price").value = '';
}
}
//Store Class : Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books =[];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))

    }
    static removeBook(title){
        const books = Store.getBooks();
        book.forEach((book,index) => {
            if(book.title === title) {
                books.splice(index,1);
            }

        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}
//Event: display books
document.addEventListener("DOMContentLoaded",UI.displayBooks);

//Event : add a book
document.getElementById("book-form").addEventListener('submit',(e)=>{
    
    e.preventDefault();
// GET form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = document.getElementById("price").value;
// Validate
if(title === "" || author === "" || price === ""){
    alert("please fill all fields")
} else{
    //Instantiate book
    const book = new Book(title,author,price);
    console.log(book);
    //Add book to UI
    UI.addBookToList(book);
    //Add book to store
    Store.addBook(book);

    //Clear fields
    UI.clearFields();

}  
    
    //Event : remove a book
    document.getElementById("book-list").addEventListener("click",(e) =>{
        UI.deleteBook(e.target);
    //remove book from store
    Store.removeBook(e.target.parentElement)
    })
});