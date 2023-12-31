const { pool } = require("../../config/database");

async function getNewArrivals(req, res) {
  try {
    const newArrivals = await pool.query(
      "SELECT id, title, image_url FROM books ORDER BY publication_date DESC LIMIT 5"
    );
    if (!newArrivals) throw new Error("There are no new arrivals available.");
    res.status(200).json(newArrivals.rows);
  } catch {
    res.status(400).json("Unable to retrieve new arrivals.");
  }
}

async function getAllBooks(req, res) {
  try {
    const books = await pool.query(
      "SELECT id, title, price, qty, image_url FROM books"
    );
    if (!books) throw new Error("There are no books available.");
    res.status(200).json(books);
  } catch {
    res.status(400).json("Unable to retrieve books.");
  }
}

async function getGenreBooks(req, res) {
  const genreId = req.params.genreId;
  try {
    const genreBooks = await pool.query(
      "SELECT books.id, title, price, qty, image_url, genre_name FROM books JOIN genres ON genres.id = books.genre_id WHERE books.genre_id = ($1)",
      [genreId]
    );
    if (!genreBooks) throw new Error("There are no books in this genre.");
    res.status(200).json(genreBooks);
  } catch {
    res.status(400).json("Unable to retrieve genre books.");
  }
}

async function getBookDetails(req, res) {
  const bookId = req.params.bookId;
  try {
    const retrieveBook = await pool.query(
      "SELECT books.id, books.title, genres.genre_name, books.description, languages.language_name, books.pages, books.isbn, books.publication_date, publishers.publisher_name, authors.first_name, authors.last_name, books.price, books.qty, books.image_url FROM books JOIN genres ON genres.id = books.genre_id JOIN languages ON languages.id = books.language_id JOIN publishers ON publishers.id = books.publisher_id JOIN authors ON authors.id = books.author_id WHERE books.id = ($1)",
      [bookId]
    );
    res.json(retrieveBook.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve book details.");
  }
}

async function deleteBook(req, res) {
  const bookId = req.params.bookId;

  try {
    await pool.query(
      "DELETE from order_details WHERE order_details.book_id = ($1)",
      [bookId]
    );
    await pool.query("DELETE FROM carts WHERE carts.book_id = ($1)", [bookId]);
    await pool.query("DELETE FROM reviews WHERE reviews.book_id = ($1)", [
      bookId,
    ]);
    await pool.query("DELETE FROM books WHERE books.id = ($1)", [bookId]);
    res.status(200).json("Book has been successfully deleted.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function getEditBookDetails(req, res) {
  const bookId = req.params.bookId;

  try {
    const book = await pool.query("SELECT * FROM books WHERE books.id = ($1)", [
      bookId,
    ]);
    res.status(200).json(book.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function editBook(req, res) {
  const bookId = req.params.bookId;
  const book = req.body.formData;

  try {
    await pool.query(
      "UPDATE books SET title = ($1), genre_id = ($2), description = ($3), language_id = ($4), pages = ($5), isbn = ($6), publication_date = ($7), publisher_id = ($8), author_id = ($9), price = ($10), qty = ($11), image_url = ($12) WHERE books.id = ($13)",
      [
        book.title,
        book.genre_id,
        book.description,
        book.language_id,
        book.pages,
        book.isbn,
        book.publication_date,
        book.publisher_id,
        book.author_id,
        book.price,
        book.qty,
        book.image_url,
        bookId,
      ]
    );
    res.status(200).json("Successfully updated book details.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function addBook(req, res) {
  const book = req.body.formData;

  try {
    await pool.query(
      "INSERT INTO books (title, genre_id, description, language_id, pages, isbn, publication_date, publisher_id, author_id, price, qty, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        book.title,
        book.genre_id,
        book.description,
        book.language_id,
        book.pages,
        book.isbn,
        book.publication_date,
        book.publisher_id,
        book.author_id,
        book.price,
        book.qty,
        book.image_url,
      ]
    );
    res.status(200).json("Successfully added book.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getNewArrivals,
  getAllBooks,
  getGenreBooks,
  getBookDetails,
  deleteBook,
  getEditBookDetails,
  editBook,
  addBook,
};
