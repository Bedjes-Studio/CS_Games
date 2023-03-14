const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
    description: { type: String, required: true },
    flag: { type: String, required: true },
    flagValue: { type: Number, required: true },
    hintId: { type: [String], required: true },
});

module.exports = mongoose.model("Challenge", challengeSchema);
