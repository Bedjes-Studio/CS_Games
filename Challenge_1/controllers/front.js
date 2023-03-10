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
    console.log(pre);

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
            console.log(week);

            checkWeek(res, week);

            // TODO request return nothing
            db.query(
                "SELECT * FROM shifs WHERE username = ? AND week = ?",
                [req.auth.username, week],
                function (error, results, fields) {
                    console.log(results);
                    res.render("page/dealerProfile", {
                        isLogged: req.auth.isLogged,
                        picture: picture,
                        pre: pre,
                    });
                }
            );
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
