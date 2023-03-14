const express = require("express");
const router = express.Router();

const loginFilter = require("../middleware/loginFilter");

const slotCtrl = require("../controllers/slot");

router.get("/play/:id", loginFilter, slotCtrl.play);

module.exports = router;
