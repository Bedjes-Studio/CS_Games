const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
    flag: { type: String, required: true },
    flagValue: { type: Number, required: true },
    challengeId: { type: String, required: true },
    hintId: { type: [String], required: true },
});

module.exports = mongoose.model("Challenge", challengeSchema);
