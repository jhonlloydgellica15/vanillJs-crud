//Book Class: Represents a Book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title: "Book One",
        author: "Jhon Doe",
        isbn: "34333",
      },
      {
        title: "Book Two",
        author: "Hello world",
        isbn: "3433445",
      },
    ];

    const books = storedBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="title">${book.title}</td>
      <td class="author">${book.author}</td>
      <td class="isbn">${book.isbn}</td>
      <td><a href="#" class="btn btn-primary btn-sm update">edit</a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">delete</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static updateBook(el) {
    const selectedRow = el.parentElement.parentElement;
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const isbn = document.querySelector("#isbn");
    const addBtn = document.querySelector(".add");

    if (el.classList.contains("update")) {
      title.value = selectedRow.cells[0].textContent;
      author.value = selectedRow.cells[1].textContent;
      isbn.value = selectedRow.cells[2].textContent;

      addBtn.value = "Update";
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//Store Class: Handles Storage

//Events: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //Get form values
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Instantiate books
  const book = new Book(title, author, isbn);

  UI.addBookToList(book);

  UI.clearFields();
});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});

//Event: Update a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.updateBook(e.target);
});
