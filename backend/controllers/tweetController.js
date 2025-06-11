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
  try {
    const tweets = await Tweet.find()
      .populate("userId", "email")
      .sort({ createdAt: -1 }); 
    
    const tweetsWithAuthor = tweets.map(tweet => ({
      ...tweet.toObject(),
      author: tweet.userId 
    }));
    
    res.json(tweetsWithAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  try {
    const { userId } = req.params;
    // If no userId in params, use the authenticated user's ID
    const targetUserId = userId || req.userId;
    
    const tweets = await Tweet.find({ userId: targetUserId })
      .populate("userId", "email ")
      .sort({ createdAt: -1 });
    
    const tweetsWithAuthor = tweets.map(tweet => ({
      ...tweet.toObject(),
      author: tweet.userId 
    }));
    
    res.json(tweetsWithAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTweetById = async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  if (!tweet) return res.status(404).json({ error: "Tweet not found" }); }
