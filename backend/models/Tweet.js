const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 140 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);
// This code defines a Mongoose schema for a Tweet model, which includes the tweet text and a reference to the user who created it. The tweet text is required and has a maximum length of 140 characters. The timestamps option automatically adds createdAt and updatedAt fields to the schema. The model is then exported for use in other parts of the application.
// The Tweet model can be used to create, read, update, and delete tweets in a MongoDB database using Mongoose.
