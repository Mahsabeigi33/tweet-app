const express= require('express');
const mongoose = require('mongoose');
const cros= require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cros());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tweets", require("./routes/tweet"));

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => 
    console.error("❌ MongoDB connection error:", err));

  app.get("/", (req, res) => {
    res.send("API is running");
  });