const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 140 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
tweetSchema.virtual('author', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});
module.exports = mongoose.model("Tweet", tweetSchema);
// This code defines the Tweet model with a schema that includes text, userId, and timestamps.
// The userId field references the User model, and the schema includes virtuals for author information.
