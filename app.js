class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

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
      <td><a href="#" class="btn btn-danger btn-sm delete">delete</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }
}
document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const book = new Book(title, author, isbn);

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    UI.addBookToList(book);
    UI.clearFields();
    UI.showAlert("Movie added", "success");
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
