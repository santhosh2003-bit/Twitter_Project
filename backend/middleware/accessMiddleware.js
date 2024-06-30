const User = require("../model/User");
const { detectDevice } = require("../utility/deviceDetection");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const { ip, browser, os, device } = detectDevice(req);

  user.accessLogs.push({
    ipAddress: ip,
    browser,
    os,
    device,
  });

  await user.save();
  next();
};
