const express = require("express");
const router = express.Router();
const { getPlan, createPlan } = require("../Controller/planController");
router.get("/plans", getPlan);
router.post("/plans", createPlan);
module.exports = router;
