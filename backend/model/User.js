const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const accessLogSchema = new mongoose.Schema({
  accessedAt: { type: Date, default: Date.now },
  ipAddress: String,
  browser: String,
  os: String,
  device: String,
  day: String,
  month: String,
  dayOfMonth: Number,
  monthOfYear: Number,
  time: String,
});
function getDateTimeDetails(date) {
  const options = { timeZone: "Asia/Kolkata", hour12: true };

  const day = date.toLocaleDateString("en-IN", { weekday: "long", ...options });
  const month = date.toLocaleDateString("en-IN", { month: "long", ...options });
  const dayOfMonth = date.getDate();
  const monthOfYear = date.getMonth() + 1; // Months are zero-based
  const time = date.toLocaleTimeString("en-IN", options);

  return { day, month, dayOfMonth, monthOfYear, time };
}
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  language: { type: String, default: "en" },
  otp: { type: String },
  otpExpires: { type: Date },
  plan: { type: String, enum: ["free", "monthly", "yearly"], default: "free" },
  sessionId: { type: String },
  paidSub: { type: Boolean },
  profile: { type: String },
  background: { type: String },
  loginHistory: [
    {
      ipAddress: String,
      browser: String,
      os: String,
      device: String,
      timestamp: { type: Date, default: Date.now },
      day: String,
      month: String,
      dayOfMonth: Number,
      monthOfYear: Number,
      time: String,
    },
  ],
  accessControl: {
    timeBased: {
      start: { type: String, default: "09:00" }, // Default start time
      end: { type: String, default: "20:00" }, // Default end time
    },
  },
  accessLogs: [accessLogSchema],
});
// Middleware to add date and time details to access logs
accessLogSchema.pre("save", function (next) {
  const dateTimeDetails = getDateTimeDetails(this.accessedAt);
  this.day = dateTimeDetails.day;
  this.month = dateTimeDetails.month;
  this.dayOfMonth = dateTimeDetails.dayOfMonth;
  this.monthOfYear = dateTimeDetails.monthOfYear;
  this.time = dateTimeDetails.time;
  next();
});
userSchema.pre("save", function (next) {
  this.loginHistory.forEach((entry) => {
    if (
      !entry.day ||
      !entry.month ||
      !entry.dayOfMonth ||
      !entry.monthOfYear ||
      !entry.time
    ) {
      const dateTimeDetails = getDateTimeDetails(entry.timestamp);
      entry.day = dateTimeDetails.day;
      entry.month = dateTimeDetails.month;
      entry.dayOfMonth = dateTimeDetails.dayOfMonth;
      entry.monthOfYear = dateTimeDetails.monthOfYear;
      entry.time = dateTimeDetails.time;
    }
  });
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  userSchema.method.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  next();
});

module.exports = mongoose.model("User", userSchema);
