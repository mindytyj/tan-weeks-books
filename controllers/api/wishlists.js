const { pool } = require("../../config/database");

async function retrieveWishlist(req, res) {
  try {
    const wishlist = await pool.query(
      `SELECT * FROM wishlists INNER JOIN books ON books.id = wishlists.book_id INNER JOIN users WHERE users.id = wishlists.user_id`
    );
    res.status(200).json(wishlist.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve wishlist.");
  }
}

async function addToWishlist(req, res) {
  try {
    const checkDuplicate = await pool.query(
      `SELECT book_id, user_id FROM wishlists WHERE book_id = ${req.body.bookId} AND user_id = ${req.body.userId}`
    );

    if (
      checkDuplicate?.rows[0]?.book_id === req.body.bookId &&
      checkDuplicate?.rows[0]?.user_id === req.body.userId
    ) {
      throw new Error("Book is already in wishlist.");
    }

    await pool.query(
      `INSERT INTO wishlists (book_id, user_id) VALUES (${req.body.bookId}, ${req.body.userId})`
    );
    res.status(200).json("Successfully added book to wishlist.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  retrieveWishlist,
  addToWishlist,
};
