const { pool } = require("../../config/database");

async function retrieveWishlist(req, res) {
  const userId = req.params.userId;

  try {
    const wishlist = await pool.query(
      "SELECT books.id, books.title, books.image_url FROM wishlists JOIN books ON books.id = wishlists.book_id WHERE wishlists.user_id = ($1)",
      [userId]
    );
    res.status(200).json(wishlist.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve wishlist.");
  }
}

async function addToWishlist(req, res) {
  try {
    const checkDuplicate = await pool.query(
      "SELECT book_id, user_id FROM wishlists WHERE book_id = ($1) AND user_id = ($2)",
      [req.body.bookId, req.body.userId]
    );

    if (
      checkDuplicate?.rows[0]?.book_id === req.body.bookId &&
      checkDuplicate?.rows[0]?.user_id === req.body.userId
    ) {
      throw new Error("Book is already in wishlist.");
    }

    await pool.query(
      "INSERT INTO wishlists (book_id, user_id) VALUES ($1, $2)",
      [req.body.bookId, req.body.userId]
    );
    res.status(200).json("Successfully added book to wishlist.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function deleteWishlistItem(req, res) {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    await pool.query(
      "DELETE FROM wishlists WHERE wishlists.user_id = ($1) AND wishlists.book_id = ($2)",
      [userId, bookId]
    );
    res.status(200).json("Book has been successfully deleted from wishlist.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  retrieveWishlist,
  addToWishlist,
  deleteWishlistItem,
};
