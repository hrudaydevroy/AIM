const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: String,
  module: String,        // e.g., "React", "Java", "JavaScript"
  topic: String,         // e.g., "react intro", "Transactions in JDBC"
  status: {             // "Present", "Absent", "Pending"
    type: String,
    default: "Pending"
  },
  instructor: String,
  date: String,         // Date of class
  time: String,         // Time of class
  batch: String,
  course: String,
  createdBy: String,    // "admin" or "sales"
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
