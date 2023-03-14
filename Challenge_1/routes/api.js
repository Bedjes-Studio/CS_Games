const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const flagRoutes = require("./flag");
const slotRoutes = require("./slot");

router.use("/user", userRoutes);
router.use("/flag", flagRoutes);
router.use("/slot", slotRoutes);

module.exports = router;
