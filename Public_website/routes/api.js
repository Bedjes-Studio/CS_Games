const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
// const flagRoutes = require("./flag");

router.use("/user", userRoutes);
// router.use("/flag", flagRoutes);

module.exports = router;
