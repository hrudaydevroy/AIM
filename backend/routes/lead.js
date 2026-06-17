const express = require('express');
const router = express.Router();

const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

// Create lead (public)
router.post('/', async (req, res) => {

  try {
    const lead = new Lead(req.body); // full form data
    await lead.save();
    res.status(201).json(lead);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

});


// Get all leads (protected)
router.get('/', async (req, res) => {

  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
// Update lead status
router.put('/:id', async (req,res)=>{
  try{
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status:req.body.status },
      { new:true }
    );
    res.json(lead);
  }catch(err){
    res.status(500).send("Server error");
  }
});
// DELETE LEAD
router.delete("/:id", async (req,res)=>{
 try{

   await Lead.findByIdAndDelete(req.params.id);

   res.json({msg:"Lead deleted"});

 }catch(err){
   console.log(err);
   res.status(500).send("Server error");
 }
});
