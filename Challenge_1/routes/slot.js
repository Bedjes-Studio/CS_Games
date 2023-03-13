const express = require("express");
const router = express.Router();

const slotCtrl = require("../controllers/slot");

router.get("/play/:id", slotCtrl.play);

module.exports = router;
