const { pool } = require("../../config/database");

async function retrieveCart(req, res) {
  const userId = req.params.userId;
  try {
    const cart = await pool.query(
      `SELECT books.title, carts.qty, users.first_name, users.last_name FROM carts JOIN books ON books.id = carts.book_id JOIN users ON users.id = carts.user_id WHERE carts.user_id = ${userId};`
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

module.exports = {
  retrieveCart,
  addToCart,
};
