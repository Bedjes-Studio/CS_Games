const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/profile", (req, res, next) => {
    if (req.auth.isLogged) {
        db.query("SELECT picture FROM user WHERE username = ?", [req.auth.username], function (error, results, fields) {
            res.render("page/profile", {
                isLogged: req.auth.isLogged,
                picture: results[0].picture,
            });
        });
    } else {
        res.redirect("/");
    }
});

router.get("/prenium", (req, res, next) => {
    res.render("page/prenium", {
        isLogged: req.auth.isLogged,
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
    res.render("page/slots", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/slot/manage", (req, res, next) => {
    res.render("page/manage", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/slot/:id", (req, res, next) => {
    res.render("page/game", {
        isLogged: req.auth.isLogged,
    });
});

router.get("/", (req, res, next) => {
    db.query("SELECT * FROM reviews", function (error, results, fields) {
        res.render("page/index", {
            isLogged: req.auth.isLogged,
            reviews: results,
        });
    });
});

router.use("*", (req, res, next) => {
    res.render("page/404", {
        isLogged: req.auth.isLogged,
    });
});

module.exports = router;
