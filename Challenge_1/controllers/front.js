const db = require("../db");

// TODO : check admin in router
exports.profile = (req, res, next) => {
    if (req.auth.isLogged) {
        db.query("SELECT picture FROM users WHERE username = ?", [req.auth.username], (error, results, fields) => {
            if (!req.auth.isAdmin) {
                displayClientProfile(req, res, results[0].picture);
            } else {
                displayAdminProfile(req, res, results[0].picture);
            }
        });
    } else {
        res.redirect("/");
    }
};

function displayClientProfile(req, res, picture) {
    res.render("page/profile", {
        isLogged: req.auth.isLogged,
        picture: picture,
    });
}

function displayAdminProfile(req, res, picture) {
    let pre = req.query.pre;

    checkPreSection(res, pre);

    switch (pre) {
        case "whales":
        case "slots":
            res.render("page/dealerProfile", {
                isLogged: req.auth.isLogged,
                picture: picture,
                pre: pre,
            });
            break;

        case "shifts":
            let week = req.query.week;

            checkWeek(res, week);

            let query = "SELECT * FROM shifts WHERE username = '" + req.auth.username + "' AND week = '" + week + "'";
            console.log(query);

            // TODO : check sql errors !!!
            db.query(query, (error, results, fields) => {
                console.log(error);
                console.log(results);
                res.render("page/dealerProfile", {
                    isLogged: req.auth.isLogged,
                    picture: picture,
                    pre: pre,
                    data: results[0],
                });
            });
    }
}

function checkPreSection(res, pre) {
    if (!pre && pre != "whales" && pre != "shifts" && pre != "slots") {
        res.redirect("/profile?pre=whales");
    }
}

function checkWeek(res, week) {
    if (!week) {
        res.redirect("/profile?pre=shifts&week=1");
    }
}