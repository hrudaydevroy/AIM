const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

 name:String,
 email:String,
 phone:String,
 guardian:String,

 institute:String,
 qualification:String,
 year:String,
 cgpa:String,

 mode:String,          // offline / online
 joiningDate:String,

 batch:String,
 course:String,

 username:String,      // Admin/Sales assigned ID
 password:String,

 image:{
  type:String,
  default:""
 },
createdBy:{
 type:String,
 default:""
},
updatedBy:{
 type:String,
 default:""
},
 role:{
  type:String,
  default:"student"
 }

},{timestamps:true});

module.exports = mongoose.model("Student",StudentSchema);
