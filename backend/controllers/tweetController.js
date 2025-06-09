const Tweet = require("../models/Tweet");

exports.createTweet = async (req, res) => {
  const { text } = req.body;
  try {
    const tweet = await Tweet.create({ text, userId: req.userId });
    res.status(201).json(tweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTweets = async (req, res) => {
  const tweets = await Tweet.find().sort({ updatedAt: -1 });
  res.json(tweets);
};

exports.updateTweet = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = await Tweet.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { text },
    { new: true }
  );
  if (!tweet) return res.status(404).json({ error: "Tweet not found" });
  res.json(tweet);
};
exports.deleteTweet = async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findOneAndDelete({ _id: id, userId: req.userId });
  if (!tweet) return res.status(404).json({ error: "Tweet not found" });
  res.json({ message: "Tweet deleted" });
};
exports.getUserTweets = async (req, res) => {
  const tweets = await Tweet.find({ userId: req.userId }).sort({ updatedAt: -1 });
  res.json(tweets);
};
exports.getTweetById = async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  if (!tweet) return res.status(404).json({ error: "Tweet not found" }); }
