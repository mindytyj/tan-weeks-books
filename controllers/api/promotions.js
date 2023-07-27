const { pool } = require("../../config/database");

async function getPromotions(req, res) {
  try {
    const promotions = await pool.query(
      "SELECT id, promotion_url FROM promotions"
    );
    if (!promotions) throw new Error("There are no promotions available.");
    res.status(200).json(promotions.rows);
  } catch {
    res.status(400).json("Unable to retrieve promotions.");
  }
}

module.exports = {
  getPromotions,
};
