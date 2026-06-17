require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const leadRoutes = require("./routes/lead");
const studentRoutes = require("./routes/student");
const videoRoutes = require("./routes/video");
const attendanceRoutes = require("./routes/attendance");
const assignmentRoutes = require("./routes/assignment");
const noteRoutes = require("./routes/note");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

/* TEST ENDPOINT */
app.get("/api/test", (req, res) => {
  res.json({ status: "Server is running", message: "Backend API is working!" });
});

/* CONNECT DB */
connectDB().catch(err => {
  console.error("MongoDB connection failed, but server will continue:", err.message);
  console.log("Note: Some features may not work without MongoDB");
});

/* ROUTES */
app.use("/api/auth",authRoutes);
app.use("/api/leads",leadRoutes);
app.use("/api/students",studentRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/assignments",assignmentRoutes);
app.use("/api/notes",noteRoutes);

const PORT=5000;

app.listen(PORT,()=>console.log("Server running on "+PORT));
