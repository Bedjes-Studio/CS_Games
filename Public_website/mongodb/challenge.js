const Challenge = require("../models/challenge");
const { extractIds } = require("./utils");

const challenges = [
    { name: "test", description: "description du challenge 1.1", flag: "flag{}", flagValue: "150", challengeId: "1.1", hintId: ["1.1.1", "1.1.2"] },
    {
        name: "test",
        description: "description du challenge 1.2",
        flag: "flag{}",
        flagValue: "175",
        challengeId: "1.2",
        hintId: ["1.2.1", "1.2.2", "1.2.3"],
    },
    { name: "test", description: "description du challenge 1.3", flag: "flag{}", flagValue: "175", challengeId: "1.3", hintId: ["1.3.1", "1.3.2"] },

    { name: "test", description: "description du challenge 2.3", flag: "flag{}", flagValue: "100", challengeId: "2.1", hintId: ["1.3.1", "1.3.2"] },
    { name: "test", description: "description du challenge 2.3", flag: "flag{}", flagValue: "150", challengeId: "2.2", hintId: ["1.3.1", "1.3.2"] },
    { name: "test", description: "description du challenge 2.3", flag: "flag{}", flagValue: "150", challengeId: "2.3", hintId: ["1.3.1", "1.3.2"] },

    { name: "test", description: "description du challenge 3.1", flag: "flag{}", flagValue: "100", challengeId: "3.1", hintId: ["3.1.1", "3.1.2"] },
    { name: "test", description: "description du challenge 3.2", flag: "flag{}", flagValue: "125", challengeId: "3.2", hintId: ["3.2.1", "3.2.2"] },
    { name: "test", description: "description du challenge 3.3", flag: "flag{}", flagValue: "125", challengeId: "3.3", hintId: ["3.3.1", "3.3.2"] },
];

exports.challengeFiller = () => {
    return Challenge.insertMany(challenges)
        .then((data) => {
            console.log("- Challenge created");
            return extractIds(data);
        })
        .catch((error) => {
            console.log("unable to create challenges");
            console.log(error);
            process.exit(1);
        });
};
