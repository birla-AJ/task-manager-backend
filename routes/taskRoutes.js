const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.json(task);
});

router.get("/", authMiddleware, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
});

router.put("/:id", authMiddleware, async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
    );
    res.json(task);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ success: true });
});

module.exports = router;
