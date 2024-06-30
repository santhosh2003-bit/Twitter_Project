require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const MONGO_URI =
  "mongodb+srv://santhosh:Twitter_web_application@cluster0.p5smz47.mongodb.net/";

app.use(cors());
app.use(express.json());

// Improved MongoDB connection using async/await
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectDB();

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, required: true },
  background: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts: " + error.message);
  }
});

app.post("/post", async (req, res) => {
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
    // console.log(newPost);
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
});

//store the user data into the database

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  user
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ message: "Registration Successfully Completed" });
    })
    .catch(() => {
      return res.status(422).json({ error: "User Already Registered" });
    });
});

//get the user from the database

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  User.findOne({ email: email, password: password })
    .then((userData) => {
      return res.status(200).json({ message: "Login Successfully  Completed" });
    })
    .catch(() => {
      return res.status(422).json({ error: "Invalid Email or Password" });
    });
});

app.get("/logged", async (req, res) => {
  const email = req.query.email;
  User.findOne({ email: email })
    .then((userData) => {
      if (!userData) {
        return res.status(422).json({ error: "Sorry User Email Not Found" });
      }
      return res.status(200).json(userData);
    })
    .catch(() => {
      return res
        .status(422)
        .json({ error: "Invalid Email Please Register First" });
    });
});
app.patch("/background", async (req, res) => {
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
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/profile", async (req, res) => {
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
});
// user Posts for the profile
app.get("/user/posts/:email", async (req, res) => {
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
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
