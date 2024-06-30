const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile: { type: String, required: true },
});
module.exports = mongoose.model("Post", postSchema);
