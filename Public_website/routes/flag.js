const express = require("express");
const router = express.Router();

const loginFilter = require("../middleware/loginFilter");
const flagCtrl = require("../controllers/flag");

// router.post("/sql", flagCtrl.sql);
router.post("/check", loginFilter, flagCtrl.check);
router.get("/scores", flagCtrl.scores);
router.get("/challenges", flagCtrl.challenges);

module.exports = router;
