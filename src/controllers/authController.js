const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// JWT Helper
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // check existing
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use"
      });
    }

    // Create user
    const user = await User.create({ username, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER
exports.getMe = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
