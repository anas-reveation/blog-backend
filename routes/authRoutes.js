const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/login", login);

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();
  res.json({ msg: 'User registered' });
});

module.exports = router;
