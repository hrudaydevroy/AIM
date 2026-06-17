const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  module: String,
  topic: String,
  batch: String,
  course: String,
  fileUrl: String,      // If note file uploaded
  createdBy: String,    // "admin" or "sales"
  assignedTo: [String]  // Array of student IDs, or empty for all in batch
}, { timestamps: true });

module.exports = mongoose.model("Note", NoteSchema);
