const bcrypt = require("bcrypt");
const User = require("../models/user");
const { extractIds } = require("./utils");

const users = [
    { username: "aaa", password: "aaa", score: 0, challengesWinId: [], hintUsedId: [] },
    { username: "bbb", password: "bbb", score: 0, challengesWinId: [], hintUsedId: [] },
];

exports.userFiller = () => {
    users.forEach((user) => {
        user.password = bcrypt.hashSync(user.password, 10);
    });

    return User.insertMany(users)
        .then((data) => {
            console.log("- Users created");
            return extractIds(data);
        })
        .catch((error) => {
            console.log("unable to create users");
            console.log(error);
            process.exit(1);
        });
};