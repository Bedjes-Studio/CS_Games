const express = require("express");
const router = express.Router();
const db = require("../db");

const frontCtrl = require("../controllers/front");

router.get("/profile", frontCtrl.profile);

router.get("/prenium", (req, res, next) => {
    res.render("page/prenium", {
        isLogged: req.auth.isLogged,
        username: req.auth.username,
        picture: req.auth.picture,
    });
});

router.get("/login", (req, res, next) => {
    res.render("page/login", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("AUTH_COOKIE");
    res.redirect("/");
});

router.get("/slots/", (req, res, next) => {
    res.redirect("/");
});

// TODO : check if id is valid
router.get("/slot/:id", (req, res, next) => {
    res.render("page/game", {
        isLogged: req.auth.isLogged,
        username: req.auth.username,
        picture: req.auth.picture,
        slotId: req.params.id,
    });
});

router.get("/", frontCtrl.index);

router.use("*", (req, res, next) => {
    res.status(404).render("page/404", {
        isLogged: req.auth.isLogged,
    });
});

module.exports = router;
