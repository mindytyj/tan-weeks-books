const express = require("express");
const router = express.Router();
const cartsCtrl = require("../../controllers/api/carts");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.get("/:userId", ensureLoggedIn, cartsCtrl.retrieveCart);
router.post("/", ensureLoggedIn, cartsCtrl.addToCart);
router.delete("/:userId/:bookId", ensureLoggedIn, cartsCtrl.deleteCartItem);
router.put("/:userId/:bookId", ensureLoggedIn, cartsCtrl.updateCartQty);
router.get("/:userId/:bookId", ensureLoggedIn, cartsCtrl.getBookQty);

module.exports = router;
