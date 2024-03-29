const { computeChallenges, computeRanking } = require("../controllers/flag");
const User = require("../models/user");

exports.index = (req, res, next) => {
    computeRanking().then((ranking) => {
        res.render("page/index", {
            isLogged: req.auth.isLogged,
            username: req.auth.username,
            ranking: ranking,
        });
    });
};

exports.challenges = (req, res, next) => {
    if (req.auth.isLogged) {
        User.findOne({ username: req.auth.username }).then((user) => {
            computeChallenges(req, res, next).then((results) => {
                res.render("page/challenges", {
                    isLogged: req.auth.isLogged,
                    username: req.auth.username,
                    challenges: results,
                    ip: user.ip,
                });
            });
        });
    } else {
        res.redirect("/");
    }
};

exports.notFound = (req, res, next) => {
    res.status(404).render("page/404", {
        isLogged: req.auth.isLogged,
        username: req.auth.username,
        picture: req.auth.picture,
    });
};
