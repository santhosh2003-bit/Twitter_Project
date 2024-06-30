const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Use Number instead of String for price
    required: true,
  },
  duration: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },
  features: {
    type: [String], // An array of features for the plan
    required: true,
  },
  stripeProductId: {
    type: String,
    required: true,
  },
  stripePriceId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Plan", PlanSchema);
