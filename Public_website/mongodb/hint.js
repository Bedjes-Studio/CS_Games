const Hint = require("../models/hint");
const { extractIds } = require("./utils");

const hints = [
    { hintId: "1-1-1" },
    { hintId: "1-1-2" },
    { hintId: "1-2-1" },
    { hintId: "1-2-2" },
    { hintId: "1-3-2" },
    { hintId: "1-3-1" },

    { hintId: "3-1-1" },
    { hintId: "3-1-2" },
    { hintId: "3-2-1" },
    { hintId: "3-2-2" },
    { hintId: "3-3-1" },
    { hintId: "3-3-2" },
];

exports.hintFiller = () => {
    return Hint.insertMany(hints)
        .then((data) => {
            console.log("- Hint created");
            return extractIds(data);
        })
        .catch((error) => {
            console.log("unable to create hints");
            console.log(error);
            process.exit(1);
        });
};
