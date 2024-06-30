const express = require("express");
const router = express.Router();

// Importing the controllers
const {
  postUpload,
  getPost,
  backgroundUpdate,
  profileUpdate,
  userPosts,
} = require("../Controller/postController");
const { protect } = require("../middleware/authMiddleware");
// Defining the routes

router.post("/upload", protect, postUpload);
router.get("/gets", protect, getPost);
router.patch("/background", protect, backgroundUpdate);
router.patch("/profile", protect, profileUpdate);
router.get("/user/posts/:email", protect, userPosts);
module.exports = router;
