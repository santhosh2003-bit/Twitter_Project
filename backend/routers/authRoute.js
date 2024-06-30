const express = require("express");
const {
  register,
  login,
  verifyOTP,
  checkAccessControl,
  getAccessLogs,
  getUserDetails,
  sendOtpForLanguageChange,
  verifyOtpForLanguageChange,
} = require("../Controller/authController");

const { protect } = require("../middleware/authMiddleware");
const logAccess = require("../middleware/accessMiddleware");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.get("/get-user-data", protect, getUserDetails);
router.get("/protected", protect, checkAccessControl, logAccess, (req, res) => {
  res.json({ message: "Access granted" });
});
router.get("/access-logs", protect, getAccessLogs);
router.post("/otp/request", protect, sendOtpForLanguageChange);
router.post("/otp/verify", protect, verifyOtpForLanguageChange);

module.exports = router;
