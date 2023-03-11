const express = require("express");
const router = express.Router();

const flagCtrl = require("../controllers/flag");

router.get("/sql", flagCtrl.sql);

module.exports = router;
