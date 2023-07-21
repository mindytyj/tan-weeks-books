const express = require("express");
const router = express.Router();
const cartsCtrl = require("../../controllers/api/carts");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.get("/:userId", ensureLoggedIn, cartsCtrl.retrieveCart);
router.post("/", ensureLoggedIn, cartsCtrl.addToCart);

module.exports = router;
