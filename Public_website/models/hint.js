const mongoose = require("mongoose");

const hintSchema = mongoose.Schema({
    hintId: { type: String, required: true },
});

module.exports = mongoose.model("Hint", hintSchema);
