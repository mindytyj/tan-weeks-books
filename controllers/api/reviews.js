const { pool } = require("../../config/database");

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

async function getUserReview(req, res) {
  const bookId = req.params.bookId;
  const userId = req.params.userId;

  try {
    const userReview = await pool.query(
      "SELECT books.title, review, recommendation FROM reviews JOIN books ON books.id = reviews.book_id WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );
    res.status(200).json(userReview);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function editReview(req, res) {
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  const review = req.body.formData;

  try {
    await pool.query(
      "UPDATE reviews SET review = ($1), recommendation = ($2) WHERE user_id = ($3) AND book_id = ($4)",
      [review.review, review.recommendation, userId, bookId]
    );
    res.status(200).json("Successfully updated book review.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function getReviews(req, res) {
  const bookId = req.params.bookId;

  try {
    const reviews = await pool.query(
      "SELECT reviews.id, review, recommendation, first_name, last_name FROM reviews JOIN users ON users.id = reviews.user_id WHERE book_id = ($1)",
      [bookId]
    );
    if (!reviews) throw new Error("There are no reviews available.");
    res.status(200).json(reviews.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  addReview,
  getUserReview,
  editReview,
  getReviews,
};
