const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();
const { protect } = require("./middleware/authMiddleware");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connect Successfully");
  } catch (error) {
    console.log("Database not Connected", error.message);
    process.exit(1);
  }
};
connectDb();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", require("./routers/authRoute"));
app.use("/api/plans", require("./routers/planRouter"));
app.use("/api/payments", require("./routers/paymentRouter"));
app.use("/api/posts", require("./routers/postRoute"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
