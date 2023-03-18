const Challenge = require("../models/challenge");
const { extractIds } = require("./utils");

const challenges = [
    { flagValue: "150", challengeId: "1-1", hintId: ["1-1-1", "1-1-2"], flag: "flag{frank_catton}" },
    { flagValue: "175", challengeId: "1-2", hintId: ["1-2-1", "1-2-2"], flag: "flag{#N1ce:PicTure}" },
    { flagValue: "175", challengeId: "1-3", hintId: ["1-3-1", "1-3-2"], flag: "flag{WP_D@ny!}" },

    { flagValue: "100", challengeId: "2-1", hintId: ["1-3-1", "1-3-2"], flag: "flag{aaaaaaaaaaaaaaaaaaaaaaaaaaaa}" },
    { flagValue: "150", challengeId: "2-2", hintId: ["1-3-1", "1-3-2"], flag: "flag{aaaaaaaaaaaaaaaaaaaaaaaaaaaa}" },
    { flagValue: "150", challengeId: "2-3", hintId: ["1-3-1", "1-3-2"], flag: "flag{aaaaaaaaaaaaaaaaaaaaaaaaaaaa}" },

    { flagValue: "100", challengeId: "3-1", hintId: ["3-1-1", "3-1-2"], flag: "flag{fenetres8BC}" },
    {
        flagValue: "125",
        challengeId: "3-2",
        hintId: ["3-2-1", "3-2-2"],
        flag: "flag{614E645266556A586E3272357538782F413F4428472B4B6250655368566B5970}",
    },
    { flagValue: "125", challengeId: "3-3", hintId: ["3-3-1", "3-3-2"], flag: "flag{Atl@ntisI$H1dden}" },
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
