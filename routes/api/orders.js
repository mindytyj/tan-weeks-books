const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.get("/:userId", ensureLoggedIn, ordersCtrl.retrieveOrders);
router.post("/", ensureLoggedIn, ordersCtrl.addToOrder);

module.exports = router;
