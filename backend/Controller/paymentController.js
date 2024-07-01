const stripe = require("stripe")(
  "sk_test_51PKiKQSCQUdWAAwAGotwwkk83adFHyjYpxOANRSwstT6xhLIbOKp70voAjnjP3bukpxCtySHDdXa0ZxsWpSwLw2900LmaRG2b7"
);
const User = require("../model/User");
const Plan = require("../model/Plan");
const nodemailer = require("nodemailer");

const subscribePlan = async (req, res) => {
  const { planId } = req.body;
  console.log(planId);
  try {
    const user = await User.findById(req.user.id);
    const plan = await Plan.findById(planId);
    if (!plan) {
      console.error("Plan not found");
      return res.status(404).json({ message: "Plan not found" });
    }
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
    });
    console.log(session);
    user.sessionId = session.id;
    user.paidSub = false;
    await user.save();
    res.status(200).json({ session_url: session.url });
  } catch (error) {
    console.error("Error in subscribePlan:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
const getSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.sessionId || user.paidSub === true) {
      return res.status(404).json({ message: "No session found" });
    }
    const session = await stripe.checkout.sessions.retrieve(user.sessionId);
    // console.log(session);
    if (session && session.status === "complete") {
      user.paidSub = true;

      await user.save();

      return res.status(200).json({ message: "success" });
    } else {
      return res.status(404).json({ message: "fail" });
    }
  } catch (error) {
    console.error("Error in getSessions:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
module.exports = { subscribePlan, getSessions };
