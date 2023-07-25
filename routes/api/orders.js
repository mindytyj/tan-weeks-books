const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.get("/:userId", ordersCtrl.retrieveOrders);
router.post("/", ordersCtrl.addToOrder);

module.exports = router;
