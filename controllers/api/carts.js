const { pool } = require("../../config/database");

async function retrieveCart(req, res) {
  const userId = req.params.userId;
  try {
    const cart = await pool.query(
      "SELECT books.id, books.title, books.price, books.image_url, carts.qty, users.first_name, users.last_name FROM carts JOIN books ON books.id = carts.book_id JOIN users ON users.id = carts.user_id WHERE carts.user_id = ($1) ORDER BY books.id ASC",
      [userId]
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json("Unable to retrieve cart items.");
  }
}

async function addToCart(req, res) {
  try {
    const checkDuplicate = await pool.query(
      "SELECT book_id, user_id FROM carts WHERE book_id = ($1) AND user_id = ($2)",
      [req.body.bookId, req.body.userId]
    );

    if (
      checkDuplicate?.rows[0]?.book_id === req.body.bookId &&
      checkDuplicate?.rows[0]?.user_id === req.body.userId
    ) {
      throw new Error("Book is already in cart.");
    }

    await pool.query(
      "INSERT INTO carts (book_id, qty, user_id) VALUES ($1, $2, $3)",
      [req.body.bookId, req.body.qty, req.body.userId]
    );
    res.status(200).json("Successfully added book to cart.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function deleteCartItem(req, res) {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    await pool.query(
      "DELETE FROM carts WHERE carts.user_id = ($1) AND carts.book_id = ($2)",
      [userId, bookId]
    );
    res.status(200).json("Book has been successfully deleted from cart.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function updateCartQty(req, res) {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    await pool.query(
      "UPDATE carts SET qty = ($1) WHERE user_id = ($2) and book_id = ($3)",
      [req.body.qty, userId, bookId]
    );
    res.status(200).json("Successfully updated quantity.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function getBookQty(req, res) {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    const bookQty = await pool.query(
      "SELECT qty FROM carts WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );
    res.status(200).json(bookQty.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  retrieveCart,
  addToCart,
  deleteCartItem,
  updateCartQty,
  getBookQty,
};
