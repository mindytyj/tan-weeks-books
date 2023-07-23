const { pool } = require("../../config/database");

async function retrieveCart(req, res) {
  const userId = req.params.userId;
  try {
    const cart = await pool.query(
      `SELECT books.id, books.title, books.price, carts.qty, users.first_name, users.last_name FROM carts JOIN books ON books.id = carts.book_id JOIN users ON users.id = carts.user_id WHERE carts.user_id = ${userId};`
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json("Unable to retrieve cart items.");
  }
}

async function addToCart(req, res) {
  try {
    const checkDuplicate = await pool.query(
      `SELECT book_id, user_id FROM carts WHERE book_id = ${req.body.bookId} AND user_id = ${req.body.userId}`
    );

    if (
      checkDuplicate?.rows[0]?.book_id === req.body.bookId &&
      checkDuplicate?.rows[0]?.user_id === req.body.userId
    ) {
      throw new Error("Book is already in cart.");
    }

    await pool.query(
      `INSERT INTO carts (book_id, qty, user_id) VALUES (${req.body.bookId}, ${req.body.qty}, ${req.body.userId})`
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
      `DELETE FROM carts WHERE carts.user_id = ${userId} AND carts.book_id = ${bookId}`
    );
    res.status(200).json("Book has been successfully deleted from cart.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function retrieveCartQty(req, res) {
  const userId = req.params.userId;

  try {
    const cartQty = await pool.query(
      `SELECT SUM(qty) FROM carts WHERE user_id = ${userId}`
    );
    res.status(200).json(cartQty.rows[0].sum);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  retrieveCart,
  addToCart,
  deleteCartItem,
  retrieveCartQty,
};
