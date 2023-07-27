const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../../controllers/api/reviews");
const { pool } = require("../../config/database");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/:bookId/:userId", ensureLoggedIn, reviewsCtrl.addReview);
router.get("/:bookId/:userId", ensureLoggedIn, reviewsCtrl.getUserReview);
router.put("/:bookId/:userId", ensureLoggedIn, reviewsCtrl.editReview);
router.get("/:bookId", reviewsCtrl.getReviews);

module.exports = router;
