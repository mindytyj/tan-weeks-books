const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../../controllers/api/reviews");
const { pool } = require("../../config/database");

router.post("/:bookId/:userId", reviewsCtrl.addReview);
router.get("/:bookId/:userId", reviewsCtrl.getUserReview);
router.put("/:bookId/:userId", reviewsCtrl.editReview);
router.get("/:bookId", reviewsCtrl.getReviews);

module.exports = router;
