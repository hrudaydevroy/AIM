const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({

 title:String,
 url:String,
 course:String,
 batch:String,   // 🔥 NEW FIELD
 createdAt:{ type:Date, default:Date.now }

});

module.exports = mongoose.model("Video",VideoSchema);
