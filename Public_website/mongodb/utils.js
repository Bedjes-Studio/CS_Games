const Challenge = require("../models/challenge");
const Hint = require("../models/hint");
const User = require("../models/user");

exports.extractIds = (data) => {
    let ids = [];
    data.forEach((row) => ids.push(row["_id"].toString()));
    return ids;
};

exports.dropTables = () => {
    return Promise.all([Challenge.deleteMany({}), Hint.deleteMany({}), User.deleteMany({})]).then((values) => {
        deletedEntries = values[0].deletedCount + values[1].deletedCount + values[2].deletedCount;
        console.log("- Deleted entries : " + deletedEntries);
    });
};
