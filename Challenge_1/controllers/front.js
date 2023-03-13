const db = require("../db");

// TODO : check admin in router
exports.profile = (req, res, next) => {
    if (req.auth.isLogged) {
        db.query("SELECT * FROM users WHERE username = ?", [req.auth.username], function (error, results, fields) {
            req.auth.firstName = results[0].firstName;
            req.auth.lastName = results[0].lastName;
            req.auth.email = results[0].email;
            req.auth.inscription = results[0].inscription;
            if (!req.auth.isAdmin) {
                displayClientProfile(req, res);
            } else {
                displayAdminProfile(req, res);
            }
        });
    } else {
        res.redirect("/");
    }
};

function displayClientProfile(req, res) {
    res.render("page/profile", {
        isLogged: req.auth.isLogged,
        identity: req.auth.firstName + " " + req.auth.lastName.toUpperCase(),
        username: req.auth.username,
        email: req.auth.email,
        inscription: req.auth.inscription,
        prenium: "Oui",
        picture: req.auth.picture,
    });
}

function displayAdminProfile(req, res) {
    let pre = req.query.pre;

    checkPreSection(res, pre);

    switch (pre) {
        case "whales":
            db.query(
                "SELECT firstName, lastName, balance FROM users WHERE balance >= 1000000",
                (error, results, fields) => {
                    renderWithPRE(req, res, results);
                }
            );
            break;

        case "slots":
            db.query("SELECT * FROM slots", (error, results, fields) => {
                renderWithPRE(req, res, results);
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
                if (error) {
                    res.status(500).json({ error: err });
                }
                console.log(results);
                renderWithPRE(req, res, results);
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

function renderWithPRE(req, res, results) {
    res.render("page/dealerProfile", {
        isLogged: req.auth.isLogged,
        identity: req.auth.firstName + " " + req.auth.lastName.toUpperCase(),
        username: req.auth.username,
        email: req.auth.email,
        inscription: req.auth.inscription,
        prenium: "Oui",
        picture: req.auth.picture,
        pre: req.query.pre,
        data: results,
    });
}
