const express = require("express");
const multer = require("multer");
const router = express.Router();

const userCtrl = require("../controllers/user");
const flagCtrl = require("../controllers/flag");


router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/check", flagCtrl.check);


module.exports = router;
