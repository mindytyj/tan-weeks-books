const express = require("express");
const router = express.Router();
const booksCtrl = require("../../controllers/api/books");
const { pool } = require("../../config/database");

router.get("/", booksCtrl.getAllBooks);
router.get("/genres/:genreId", booksCtrl.getGenreBooks);
router.get("/:bookId", booksCtrl.getBookDetails);
router.post("/:bookId/reviews/:userId", booksCtrl.addReview);
router.get("/:bookId/reviews", booksCtrl.getReviews);
router.delete("/:bookId", booksCtrl.deleteBook);

module.exports = router;
