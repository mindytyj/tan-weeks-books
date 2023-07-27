const express = require("express");
const router = express.Router();
const promotionsCtrl = require("../../controllers/api/promotions");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.get("/", promotionsCtrl.getPromotions);

module.exports = router;
