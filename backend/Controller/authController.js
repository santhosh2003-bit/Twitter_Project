const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ip = require("ip");
const { detectDevice } = require("../utility/deviceDetection");
const dotenv = require("dotenv");
dotenv.config();
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const user = await User.create({ name, email, password });
    await user.save();
    // const token = jwt.sign({ id: user.id }, process.env.JWT_Token, {
    //   expiresIn: "1day",
    // });
    res.status(201).json({ message: "Registration Successfully Completed..." });
  } catch (error) {
    res.status(500).json({ error: "Server Error" + error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compare(password, user.password)) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid email or password" });
  }

  const { browser, os, device } = detectDevice(req);

  user.loginHistory.push({ ipAddress: ip.address(), browser, os, device });
  await user.save();

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 1 * 60000); // OTP valid for 1 minute
  await user.save();

  const Transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,

    subject: "OTP",
    html: `<h1>Your OTP is ${otp}</h1>`,
  };

  Transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({ error: "Error Here Get" + error.message });
    } else {
      res.json({ message: "OTP sent to your email " });
    }
  });
};
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!email || !otp) {
    return res.status(401).json({ error: "OTP and Email Required please" });
  }
  try {
    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    const useDetails = {
      email: user.email,
      name: user.name,
    };

    res.json({ token, useDetails });
  } catch (error) {
    res.json({ error: error.message });
  }
};
const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ user: user });
};
const checkAccessControl = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const currentTime = new Date().toTimeString().slice(0, 5); // Current time in HH:MM format

  // Extracting start and end times
  const { start, end } = user.accessControl.timeBased;

  if (start > end) {
    // Handle cases where the time range spans midnight (e.g., 22:00 to 06:00)
    if (currentTime < start && currentTime > end) {
      return res.status(403).json({ error: "Access not allowed at this time" });
    }
  } else {
    // Regular time range comparison
    if (currentTime < start || currentTime > end) {
      return res.status(403).json({ error: "Access not allowed at this time" });
    }
  }

  next();
};
const getAccessLogs = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ user: user });
};

const sendOtpForLanguageChange = async (req, res) => {
  const { email } = req.body;
  const user = req.user;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!user) {
    return res.status(400).json({ message: "User Not Exists In Our Database" });
  }
  try {
    const otp = generateOtp();

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL || "chintuboda870@gmail.com",
      to: email || "santhoshchintu534@gmail.com",
      subject: "OTP for language change",
      text: `Your OTP is ${otp}`,
    };

    transport.sendMail(mailOptions, async (err, info) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        await user.save();
        res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

const verifyOtpForLanguageChange = async (req, res) => {
  const { otp, language } = req.body;
  const user = req.user;
  if (!otp) {
    return res.status(400).json({ error: "OTP is required" });
  }
  try {
    if (user.otp === otp && user.otpExpires > Date.now()) {
      user.language = language;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.json({ message: "Language updated successfully", language });
    } else {
      res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyOTP,
  checkAccessControl,
  getAccessLogs,
  getUserDetails,
  sendOtpForLanguageChange,
  verifyOtpForLanguageChange,
};
