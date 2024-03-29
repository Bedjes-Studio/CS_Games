const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    ip: { type: String, required: true },
    school: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    score: { type: Number, required: true },
    challengesWinId: { type: [String], required: true },
    hintUsedId: { type: [String], required: true },
});

module.exports = mongoose.model("User", userSchema);
