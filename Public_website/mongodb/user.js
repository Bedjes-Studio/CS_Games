const bcrypt = require('bcrypt');
const User = require('../models/user');
const { extractIds } = require('./utils');

const users = [
    { name: "Alice", email: "alice@gmail.com", password: "aaa" },
    { name: "Bob", email: "bob@gmail.com", password: "bbb" },
];

exports.userfiller = () => {

    users.forEach((user) => {
        user.password =     bcrypt.hashSync(user.password, 10);
    });

    console.log(users);

    return User.insertMany(users).then(
        (data) => {
            console.log("- Users created");
            return (extractIds(data));
        }
    ).catch(
        (error) => {
            console.log("unable to create users");
            process.exit(1);
        }
    );
};