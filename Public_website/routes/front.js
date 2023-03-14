const express = require("express");
const router = express.Router();

const loginFilter = require("../middleware/loginFilter");

const frontCtrl = require("../controllers/front");

router.get("/login", (req, res, next) => {
    res.render("page/login", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("AUTH_COOKIE");
    res.redirect("/");
});

router.get("/challenges", loginFilter, frontCtrl.challenges);

router.get("/", frontCtrl.index);

router.use("*", frontCtrl.notFound);

module.exports = router;
