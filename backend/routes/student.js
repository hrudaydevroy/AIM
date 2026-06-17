const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const multer = require("multer");

/* ================= IMAGE UPLOAD ================= */

const storage = multer.diskStorage({
 destination:"uploads/",
 filename:(req,file,cb)=>{
   cb(null,Date.now()+"-"+file.originalname);
 }
});

const upload = multer({storage});

/* ================= ADD STUDENT ================= */

router.post("/", upload.single("image"), async(req,res)=>{
 try{

  const data = req.body;

  if(req.file){
   data.image="/uploads/"+req.file.filename;
  }

  const student = new Student(data);
  await student.save();

  res.json(student);

 }catch(err){
  console.log(err);
  res.status(500).send("Server Error");
 }
});

/* ================= GET ALL STUDENTS ================= */

router.get("/", async(req,res)=>{
 try {
   const { batch, course } = req.query;
   let query = {};
   
   if (batch) query.batch = batch;
   if (course) query.course = course;
   
   const students = await Student.find(query).sort({createdAt:-1});
   res.json(students);
 } catch (err) {
   res.status(500).json({ msg: "Server error" });
 }
});

/* ================= GET STUDENT BY ID ================= */

router.get("/:id", async(req,res)=>{
 try{
   const student = await Student.findById(req.params.id);
   if(!student) return res.status(404).json({msg:"Student not found"});
   res.json(student);
 }catch(err){
   res.status(500).send("Server Error");
 }
});

/* ================= DELETE STUDENT ================= */

router.delete("/:id", async(req,res)=>{
 try{
   await Student.findByIdAndDelete(req.params.id);
   res.json({msg:"Deleted"});
 }catch(err){
   res.status(500).send("Delete Error");
 }
});

/* ================= STUDENT LOGIN ================= */

router.post("/login", async(req,res)=>{
 try{

  const {username,password,batch} = req.body;

  if(!username || !password || !batch){
    return res.status(400).json({msg:"Please provide username, password, and batch"});
  }

  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  // Normalize batch: ensure proper format (Batch-1, Batch-2, Batch-3)
  let trimmedBatch = batch.trim();
  // Handle case variations: batch-1, BATCH-1, Batch-1 all become Batch-1
  if(trimmedBatch.match(/^batch-[123]$/i)){
    trimmedBatch = "Batch-" + trimmedBatch.split("-")[1];
  }

  console.log("Student login attempt:", {
    username: trimmedUsername,
    batch: trimmedBatch,
    passwordLength: trimmedPassword.length
  });

  // Try to find student - check both original and normalized batch
  let student = await Student.findOne({
   username: trimmedUsername,
   password: trimmedPassword,
   batch: trimmedBatch
  });

  // If not found, try case-insensitive batch search
  if(!student){
    const allStudents = await Student.find({ username: trimmedUsername });
    if(allStudents.length > 0){
      const foundStudent = allStudents.find(s => 
        s.password === trimmedPassword && 
        s.batch && 
        s.batch.toLowerCase() === trimmedBatch.toLowerCase()
      );
      if(foundStudent){
        student = foundStudent;
        console.log("Found student with case-insensitive batch match");
      }
    }
  }

  if(!student){
    // Check if username exists but batch/password wrong
    const usernameExists = await Student.findOne({ username: trimmedUsername });
    if(usernameExists){
      console.log("Username found but batch/password mismatch. Student batch:", usernameExists.batch);
      return res.status(400).json({
        msg:`Invalid credentials. Username found but batch or password incorrect. Expected batch: "${usernameExists.batch}"`
      });
    }
    return res.status(400).json({msg:"Invalid credentials. Username not found. Please check Username, Password, and Batch"});
  }

  console.log("Student login successful:", student.name);
  res.json(student);

 }catch(err){
  console.error("Student login error:", err);
  res.status(500).json({msg:"Login Error: " + err.message});
 }
});

module.exports = router;
