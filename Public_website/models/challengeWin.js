const mongoose = require("mongoose");

const challengeWinSchema = mongoose.Schema({
    userId: { type: String, required: true },
    challengeId: { type: String, required: true },
});

module.exports = mongoose.model("challengeWin", challengeWinSchema);
