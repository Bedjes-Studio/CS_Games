const mongoose = require("mongoose");

const hintUsedSchema = mongoose.Schema({
    userId: { type: String, required: true },
    hingId: { type: String, required: true },
});

module.exports = mongoose.model("hintUsed", hintUsedSchema);
