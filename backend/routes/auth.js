const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Student = require('../models/Student'); // 🔥 ADD

// ========================
// REGISTER (ADMIN/SALES USERS)
// ========================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Sales registration - default role is 'sales'
    user = new User({ name, email, password, role: 'sales' });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, role: 'sales' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: err.message || 'Server error' });
  }
});

// ========================
// LOGIN (ADMIN / SALES)
// ========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    // Use role from database, default to 'sales' if not set
    const role = user.role || 'sales';

    res.json({ token, role });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: err.message || 'Server error' });
  }
});


// ========================
// STUDENT LOGIN (NEW)
// ========================
router.post("/student-login", async(req,res)=>{

 const {username,password} = req.body;

 try{

   const student = await Student.findOne({username,password});

   if(!student){
     return res.status(400).json({msg:"Invalid student login"});
   }

   res.json({
     role:"student",
     batch:student.batch,
     course:student.course,
     username:student.username
   });

 }catch(err){
   res.status(500).send("Server error");
 }

});

module.exports = router;
