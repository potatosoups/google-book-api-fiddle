import { $, invalidSubmit, getBooks } from "./book.service.js";
import { initialBooks } from "./mock-book-response.js";

updateView(initialBooks);

$("#input").addEventListener("keyup", onSubmit);
$("#button").addEventListener("click", onSubmit);

async function onSubmit(e) {
  if (invalidSubmit(e)) return;

  clearBooksInView();

  var books = await getBooks($("#input").value);

  updateView(books);
}

function updateView(books) {
  setSearchControlsDisabled(true);
  listBooksInView(books);
  setSearchControlsDisabled(false);
}

function listBooksInView(books) {
  for (let i = 0; i < books.length; i++) {
    var { volumeInfo } = books[i];

    const li = createListItem(volumeInfo);

    $("#books").appendChild(li);
  }
}

function createListItem(volumeInfo) {
  var li = document.createElement("li");
  var titleEl = document.createElement("h4");
  var authorEl = document.createElement("span");
  titleEl.textContent = volumeInfo.title;

  volumeInfo.authors?.forEach((author) => (authorEl.textContent = author));

  li.appendChild(titleEl);
  li.appendChild(authorEl);
  li.appendChild(authorEl);
  return li;
}

function clearBooksInView() {
  $("#books")
    .querySelectorAll("li")
    .forEach((e) => {
      e.remove();
    });
}
async function setSearchControlsDisabled(isDisabled) {
  $("#input").disabled = isDisabled;
  $("#button").disabled = isDisabled;
}
