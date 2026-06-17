const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

// GET VIDEOS (STUDENT) - with optional batch filter
router.get("/", async(req,res)=>{
 try {
   const { batch } = req.query;
   let query = {};
   
   if (batch) {
     query.batch = batch;
   }
   
   const videos = await Video.find(query).sort({createdAt:-1});
   res.json(videos);
 } catch(err) {
   res.status(500).json({ msg: "Server error" });
 }
});

// GET VIDEOS BY BATCH
router.get("/batch/:batch", async(req,res)=>{
 try {
   const videos = await Video.find({
     batch: req.params.batch
   }).sort({createdAt:-1});
   res.json(videos);
 } catch(err) {
   res.status(500).json({ msg: "Server error" });
 }
});

// ADD VIDEO (ADMIN/SALES)
router.post("/", async(req,res)=>{
 try{
   const video = new Video(req.body);
   await video.save();
   res.json(video);
 }catch(err){
   res.status(500).json({ msg: "Server error" });
 }
});

// DELETE VIDEO
router.delete("/:id", async(req,res)=>{
 try {
   await Video.findByIdAndDelete(req.params.id);
   res.json({ msg: "Deleted" });
 } catch(err) {
   res.status(500).json({ msg: "Server error" });
 }
});

module.exports = router;
