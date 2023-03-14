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

router.get("/premium", (req, res, next) => {
    res.render("page/premium", {
        isLogged: req.auth.isLogged,
        username: req.auth.username,
        picture: req.auth.picture,
    });
});

router.get("/profile", loginFilter, frontCtrl.profile);

router.get("/slots/:id", loginFilter, frontCtrl.slot);

router.get("/", frontCtrl.index);

router.use("*", frontCtrl.notFound);

module.exports = router;
