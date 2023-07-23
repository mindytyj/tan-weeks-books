const express = require("express");
const router = express.Router();
const wishlistsCtrl = require("../../controllers/api/wishlists");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.get("/:userId", ensureLoggedIn, wishlistsCtrl.retrieveWishlist);
router.post("/", ensureLoggedIn, wishlistsCtrl.addToWishlist);
router.delete("/:userId/:bookId", wishlistsCtrl.deleteWishlistItem);

module.exports = router;
