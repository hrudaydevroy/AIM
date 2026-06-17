const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET all notes
router.get("/", async (req, res) => {
  try {
    const { batch, course, studentId } = req.query;
    let query = {};
    
    if (batch) query.batch = batch;
    if (course) query.course = course;
    
    let notes = await Note.find(query).sort({ createdAt: -1 });
    
    // Filter by studentId if provided
    if (studentId) {
      notes = notes.filter(n => 
        !n.assignedTo || n.assignedTo.length === 0 || n.assignedTo.includes(studentId)
      );
    }
    
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
