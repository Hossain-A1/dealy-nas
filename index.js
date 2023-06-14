const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user")
const deviceRoutes = require("./routes/device")

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

// middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello hossain" });
});
app.use("/api/auth/user",userRoutes )
app.use("/api/data/device",deviceRoutes )
// mongoDB connected
mongoose.connect(uri, { useUnifiedTopology: true }).then(() => {
  app.listen(port, () => {
    console.log(`mongoDB connected and app lint on port ${port}`);
  });
});
