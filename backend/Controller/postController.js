const Post = require("../model/Post");
const User = require("../model/User");
const postUpload = async (req, res) => {
  const { title, content, username, name, email, profile } = req.body;
  if (!title || !content || !username || !name || !email || !profile) {
    return res.status(422).json({ error: "All fields are required" }); // 422 status code for unprocessable entity (client error)
  }
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
    if (!posts) {
      return res.status(404).json({ error: "No Posts found" }); // 404 status code for not found (client error) 422 status code for unprocessable entity (client error) 500 status code for server error 400 status code for bad request (client error) 412 status code for precondition failed (client error) 403 status code for forbidden (client error) 409 status code for conflict (client error) 410 status code for gone (client error) 405 status code for method not allowed (client error) 408 status code for request timeout (client error) 413 status code for request entity too large (client error) 415 status code for unsupported media type (client error) 416 status code for request range not satisfiable (client error) 417 status code
    }
    res.json({ posts: posts });
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
    res.status(200).json({ message: "background Uploaded Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const userPosts = async (req, res) => {
  const email = req.user.email;
  console.log(email);
  try {
    const userData = await Post.find({ email: email });
    if (!userData) {
      return res.status(422).json({ error: "User not found" });
    } else {
      return res.status(200).json({ user: userData });
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
