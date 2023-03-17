const Challenge = require("../models/challenge");
const Hint = require("../models/hint");
const User = require("../models/user");
const HintUsed = require("../models/hintUsed");
const ChallengeWin = require("../models/challengeWin");

exports.extractIds = (data) => {
    let ids = [];
    data.forEach((row) => ids.push(row["_id"].toString()));
    return ids;
};

exports.dropTables = () => {
    return Promise.all([Challenge.deleteMany({}),  ChallengeWin.deleteMany({}), Hint.deleteMany({}), HintUsed.deleteMany({}), User.deleteMany({})]).then((values) => {
        deletedEntries = values[0].deletedCount + values[1].deletedCount + values[2].deletedCount;
        console.log("- Deleted entries : " + deletedEntries);
    });
};
