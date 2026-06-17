const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name:String,
  email:String,
  mobile:String,
  course:String,
  message:String,
  status:{ type:String, default:"new"},
  createdAt:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("Lead",LeadSchema);
