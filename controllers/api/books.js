const { pool } = require("../../config/database");

async function getAllBooks(req, res) {
  try {
    const books = await pool.query("SELECT id, title, price, qty FROM books");
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
      `SELECT books.id, title, price, qty, genre_name FROM books JOIN genres ON genres.id = books.genre_id WHERE books.genre_id = ${genreId}`
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
      `SELECT books.id, books.title, genres.genre_name, books.description, languages.language_name, books.pages, books.isbn, books.publication_date, publishers.publisher_name, authors.first_name, authors.last_name, books.price, books.qty, books.image_url FROM books JOIN genres ON genres.id = books.genre_id JOIN languages ON languages.id = books.language_id JOIN publishers ON publishers.id = books.publisher_id JOIN authors ON authors.id = books.author_id WHERE books.id = ${bookId}`
    );
    res.json(retrieveBook.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve book details.");
  }
}

async function addReview(req, res) {
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  const data = req.body.formData;

  try {
    await pool.query(
      "INSERT INTO reviews (review, recommendation, user_id, book_id) VALUES ($1, $2, $3, $4)",
      [data.review, data.recommendation, userId, bookId]
    );
    res.status(200).json("Successfully added book review.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getAllBooks,
  getGenreBooks,
  getBookDetails,
  addReview,
};
