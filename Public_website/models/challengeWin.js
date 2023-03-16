const mongoose = require("mongoose");

const challengeWinSchema = mongoose.Schema({
    username: { type: String, required: true },
    challengeId: { type: String, required: true },
});

module.exports = mongoose.model("challengeWin", challengeWinSchema);
