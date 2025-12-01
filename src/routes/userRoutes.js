const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// @route GET /api/users/me
// Protected route
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
