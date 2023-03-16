const mongoose = require("mongoose");

const hintUsedSchema = mongoose.Schema({
    username: { type: String, required: true },
    challengeId: { type: String, required: true },
    hintId: { type: String, required: true },
});

module.exports = mongoose.model("hintUsed", hintUsedSchema);
