const mongoose = require("mongoose");

const ResetTokenSchema = new mongoose.Schema({
    email: String,
    token: String,
    expiresAt: Date,
});

module.exports = mongoose.model("ResetToken", ResetTokenSchema);
