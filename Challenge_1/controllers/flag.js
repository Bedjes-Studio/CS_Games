const db = require("../db");
const fs = require("fs");
const path = require("path");

// check if injection is ok
exports.sql = (req, res, next) => {
    db.query("SELECT value FROM config WHERE attribute = 'slots_config'", function (error, results, fields) {
        fs.readFile(__dirname + "/../" + results[0].value, "utf8", (err, content) => {
            if (err) {
                console.error(err);
                return;
            }
            if (content == "test") {
                res.status(200).json({
                    isFlagged: true,
                });
            } else {
                res.status(200).json({
                    isFlagged: false,
                });
            }
        });
    });
};
