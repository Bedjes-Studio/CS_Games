const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    flag: { type: String, required: true },
    flagValue: { type: Number, required: true },
    challengeId: { type: String, required: true },
    hintId: { type: [String], required: true },
});

module.exports = mongoose.model("Challenge", challengeSchema);
