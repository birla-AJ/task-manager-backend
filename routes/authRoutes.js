const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ResetToken = require("../models/ResetToken");
const crypto = require("crypto");

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

router.post("/signup", async (req, res) => {
    
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ token: generateToken(user) });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ token: generateToken(user) });
});

router.post("/reset-password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");
    await new ResetToken({ email, token, expiresAt: Date.now() + 3600000 }).save();

    res.json({ message: "Password reset email sent." });
});

module.exports = router;
