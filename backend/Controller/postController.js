const Post = require("../model/Post");
const User = require("../model/User");
const postUpload = async (req, res) => {
  const { title, content, username, name, email, profile } = req.body;
  try {
    const newPost = new Post({
      title: title,
      content: content,
      username: username,
      name: name,
      email: email,
      profile: profile,
    });

    await newPost
      .save()
      .then((data) => {
        res.status(200).json({ message: "Successfully Posted" });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts: " + error.message });
  }
};
const backgroundUpdate = async (req, res) => {
  const { email, background } = req.body;
  if (!email || !background) {
    return res.status(422).json({ error: "Email and background are required" });
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { background } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(422).json({ error: "User not found" });
    }
    res.status(200).json({ message: "background Uploaded Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const profileUpdate = async (req, res) => {
  const { email, profile } = req.body;
  if (!email || !profile) {
    return res.status(422).json({ error: "Email and profile are required" });
  }
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { profile } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(422).json({ error: "User not found" });
    }
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const userPosts = async (req, res) => {
  const email = req.params.email;
  try {
    const userData = await Post.find({ email: email });
    if (!userData) {
      return res.status(422).json({ error: "User not found" });
    } else {
      return res.status(200).json(userData);
    }
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};
module.exports = {
  postUpload,
  getPost,
  backgroundUpdate,
  profileUpdate,
  userPosts,
};
