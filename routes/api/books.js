const express = require("express");
const router = express.Router();
const booksCtrl = require("../../controllers/api/books");
const { pool } = require("../../config/database");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/newArrivals", booksCtrl.getNewArrivals);
router.get("/", booksCtrl.getAllBooks);
router.get("/genres/:genreId", booksCtrl.getGenreBooks);
router.get("/:bookId", booksCtrl.getBookDetails);
router.delete("/:bookId", ensureLoggedIn, booksCtrl.deleteBook);
router.get("/edit/:bookId", ensureLoggedIn, booksCtrl.getEditBookDetails);
router.put("/:bookId", ensureLoggedIn, booksCtrl.editBook);
router.post("/", ensureLoggedIn, booksCtrl.addBook);

module.exports = router;
