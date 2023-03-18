const db = require("./db");

db.query("DROP DATABASE test", (err) => {
    if (err) throw err;
    console.log("Database dropped Successfully !");

    db.query("CREATE DATABASE test", (err) => {
        if (err) throw err;
        console.log("Database Created Successfully !");

        db.query("USE test", (error) => {
            if (error) throw error;
            console.log("Using Database");
        });
    });
});

// db.query("SELECT value FROM config WHERE attribute = 'slots_config'", function (error, results, fields) {});
