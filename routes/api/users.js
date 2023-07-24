const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const { pool } = require("../../config/database");

router.post("/", usersCtrl.createUser);
router.post("/login", usersCtrl.login);
router.put("/:userId/firstName", ensureLoggedIn, usersCtrl.updateFirstName);
router.put("/:userId/lastName", ensureLoggedIn, usersCtrl.updateLastName);
router.put("/:userId/email", usersCtrl.updateEmail);
router.put("/:userId/password", usersCtrl.updatePassword);

router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
