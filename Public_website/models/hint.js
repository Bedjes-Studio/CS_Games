const mongoose = require("mongoose");

const hintSchema = mongoose.Schema({
    description: { type: String, required: true },
});

module.exports = mongoose.model("Hint", hintSchema);
