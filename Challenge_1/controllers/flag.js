const db = require("../db");
const fs = require("fs");
const checksum = require("checksum");

// check if injection is ok
exports.sql = (req, res, next) => {
    db.query("SELECT value FROM config WHERE attribute = 'slots_config'", function (error, results, fields) {
        fs.readFile(__dirname + "/../" + results[0].value, "utf8", (err, content) => {
            if (err) {
                console.error(err);
                res.status(200).json({
                    isFlagged: false,
                });
            }

            if (checksum(content) == "953725e32678cc2e6f65a3f974b22f9a724e8cbb") {
                res.status(200).json({
                    isFlagged: true,
                    flag: "flag{#N1ce:PicTure}",
                });
            } else {
                res.status(200).json({
                    isFlagged: false,
                });
            }
        });
    });
};
