/**
 * @param {string} title 
 * @param {string} author 
 * @param {number} pages 
 * @param {boolean} isRead 
 * @returns {Object}
 */
function Book (title, author, year, pages, isRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;

  /**
   * Render informations about the book
   * @returns {string}
   */
  this.info = () => {
    const read = (this.isRead) ? 'read' : 'not yet read';
    return `${this.title} (${this.year}) by ${this.author}, ${this.pages} pages, ${read}`;
  };
};

/**
 * Add book to the array myLibrary
 * @param {Book} book 
 */
const addBookToLibrary = (book) => {
  myLibrary[myLibrary.length] = book;
};

/**
 * Render a Book array in #library
 * @param {array<Book>} array 
 * @param {number} numbersOfBooks - require, if it's not the first time you use the function in the program, if not data-index value will be wrong.
 * @returns {void}
 */
const render = (array, numbersOfBooks = 0) => {
  const libraryElt = document.getElementById('library');
  let i = numbersOfBooks;

  array.forEach(book => {
    const rowElt = document.createElement('tr');
    rowElt.setAttribute('data-index', i++);
    const titleElt = document.createElement('td');
    titleElt.textContent = book.title;
    rowElt.appendChild(titleElt);
    const authorElt = document.createElement('td');
    authorElt.textContent = book.author;
    rowElt.appendChild(authorElt);
    const yearElt = document.createElement('td');
    yearElt.textContent = book.year;
    rowElt.appendChild(yearElt);
    const pagesElt = document.createElement('td');
    pagesElt.textContent = book.pages;
    rowElt.appendChild(pagesElt);
    const readElt = document.createElement('td');
    if (!book.isRead) readElt.classList.add('read');
    (book.isRead) ? readElt.textContent = '✓' : readElt.textContent = '❌';
    rowElt.appendChild(readElt);
    const deleteElt = document.createElement('td');
    deleteElt.classList.add('delete');
    deleteElt.textContent = '🗑';
    rowElt.appendChild(deleteElt);
    libraryElt.appendChild(rowElt);
  });
};

let myLibrary = [
  new Book('Harry Potter à l\'école des sorciers', 'J.K. Rowling', 1998, 308, true),
  new Book('Harry Potter et la Chambre des secrets', 'J.K. Rowling', 1999, 364, false),
  new Book('Harry Potter et le Prisonnier d\'Azkaban', 'J.K. Rowling', 1999, 474, false),
  new Book('Harry Potter et la Coupe de feu', 'J.K. Rowling', 2000, 656, false),
  new Book('Harry Potter et l\'Ordre du phénix', 'J.K. Rowling', 2003, 984, false),
  new Book('Harry Potter et le Prince de sang-mêlé', 'J.K. Rowling', 2005, 720, false),
  new Book('Harry Potter et les Reliques de la Mort', 'J.K. Rowling', 2007, 816, false)
];

render(myLibrary);

// Form
const addBook = document.getElementById('add-book');
addBook.addEventListener('click', () => {
  addBook.setAttribute('hidden', '');
  const formAddBook = document.getElementById('form-add-book');
  formAddBook.removeAttribute('hidden', '');
});

// Form submit
const formAddBook = document.getElementById('form-add-book');
formAddBook.addEventListener('submit', (e) => {
  e.preventDefault();
  formAddBook.setAttribute('hidden', '');
  addBook.removeAttribute('hidden');

  let isRead = false;
  if (e.target.read.value === 'read') {
    isRead = true;
  }
  const newBook = new Book(
    e.target.title.value, 
    e.target.author.value, 
    e.target.year.value, 
    e.target.pages.value, 
    isRead
  );
  formAddBook.reset();
  render([newBook], myLibrary.length); // We rendered if before adding it to get the good index, if not (length -1) is needed
  addBookToLibrary(newBook);
})

// Delete
const deleteElts = document.querySelectorAll('.delete');
deleteElts.forEach(element => {
  element.addEventListener('click', () => {
    const isSure = confirm('Are you sure to delete this book ?');
    if (isSure) {
      const parent = element.parentElement;
      myLibrary.splice(parent.getAttribute('data-index')); // delete element from library
      parent.parentElement.removeChild(parent); // grandfather delete his son
    }
  });
});

// Read
const readElts = document.querySelectorAll('.read');
readElts.forEach(element => {
  element.addEventListener('click', () => {
    const parent = element.parentElement;
    myLibrary[parent.getAttribute('data-index')].isRead = true;
    element.textContent = '✓';
    element.classList.remove('read');
  });
});
