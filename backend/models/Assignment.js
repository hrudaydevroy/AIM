const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  module: String,
  topic: String,
  batch: String,
  course: String,
  dueDate: String,
  status: {             // "Pending", "Submitted", "Graded"
    type: String,
    default: "Pending"
  },
  fileUrl: String,      // If assignment file uploaded
  createdBy: String,    // "admin" or "sales"
  assignedTo: [String]  // Array of student IDs, or empty for all in batch
}, { timestamps: true });

module.exports = mongoose.model("Assignment", AssignmentSchema);
