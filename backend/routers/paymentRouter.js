const express = require("express");
const {
  subscribePlan,
  getSessions,
} = require("../Controller/paymentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/subscribe", protect, subscribePlan);
router.get("/getsession", protect, getSessions);

module.exports = router;
