const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// GET all assignments
router.get("/", async (req, res) => {
  try {
    const { batch, course, studentId } = req.query;
    let query = {};
    
    if (batch) query.batch = batch;
    if (course) query.course = course;
    
    let assignments = await Assignment.find(query).sort({ createdAt: -1 });
    
    // Filter by studentId if provided
    if (studentId) {
      assignments = assignments.filter(a => 
        !a.assignedTo || a.assignedTo.length === 0 || a.assignedTo.includes(studentId)
      );
    }
    
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create assignment
router.post("/", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT update assignment
router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE assignment
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
