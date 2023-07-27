const { pool } = require("../../config/database");

async function retrieveOrders(req, res) {
  const userId = req.params.userId;

  try {
    const orderHistory = await pool.query(
      "SELECT books.id, books.title, books.image_url, order_details.qty, order_details.total FROM order_details JOIN books ON books.id = order_details.book_id JOIN orders ON orders.id = order_details.order_id WHERE orders.user_id = ($1) ORDER BY order_details.order_id DESC",
      [userId]
    );
    if (!orderHistory)
      throw new Error("There is no order history for the user.");
    res.status(200).json(orderHistory.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve order history.");
  }
}

async function addToOrder(req, res) {
  try {
    const orderId = await pool.query(
      "INSERT INTO orders (user_id) VALUES ($1) RETURNING orders.id",
      [req.body.userId]
    );
    if (!orderId)
      throw new Error(
        "Unable to retrieve order id. Failed to create a new order."
      );
    await req.body.cart.map((cartItem) => {
      pool.query(
        "INSERT INTO order_details (book_id, qty, total, order_id) VALUES ($1, $2, $3, $4)",
        [
          cartItem.id,
          cartItem.qty,
          cartItem.price * cartItem.qty,
          orderId.rows[0].id,
        ]
      );
    });
    await pool.query("DELETE from carts WHERE carts.user_id = ($1)", [
      req.body.userId,
    ]);
    res.status(200).json("Order placed successfully.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  retrieveOrders,
  addToOrder,
};
