const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// GET all attendance records
router.get("/", async (req, res) => {
  try {
    const { studentId, batch, course } = req.query;
    let query = {};
    
    if (studentId) query.studentId = studentId;
    if (batch) query.batch = batch;
    if (course) query.course = course;
    
    const attendance = await Attendance.find(query).sort({ date: -1, time: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET attendance by student ID
router.get("/student/:studentId", async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.studentId })
      .sort({ date: -1, time: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create attendance record
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST bulk create attendance (for batch)
router.post("/bulk", async (req, res) => {
  try {
    const { students, module, topic, status, instructor, date, time, batch, course, createdBy, notes } = req.body;
    
    // Get student names
    const Student = require("../models/Student");
    const studentDocs = await Student.find({ _id: { $in: students } });
    const studentMap = {};
    studentDocs.forEach(s => {
      studentMap[s._id] = s.name;
    });
    
    const attendanceRecords = students.map(studentId => ({
      studentId,
      studentName: studentMap[studentId] || "",
      module,
      topic,
      status,
      instructor,
      date,
      time,
      batch,
      course,
      createdBy,
      notes: notes || ""
    }));
    
    const saved = await Attendance.insertMany(attendanceRecords);
    res.json(saved);
  } catch (err) {
    console.error("Bulk attendance error:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

// PUT update attendance
router.put("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE attendance
router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
