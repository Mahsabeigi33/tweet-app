const express = require("express");
const router = express.Router();
const { createTweet, getAllTweets, updateTweet , deleteTweet,getUserTweets } = require("../controllers/tweetController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, createTweet);
router.get("/", auth, getAllTweets);
router.get("/user/:userId", auth, getUserTweets);
router.put("/:id", auth, updateTweet);
router.delete("/:id", auth, deleteTweet);

module.exports = router;
// This code sets up the tweet routes for creating, retrieving, and updating tweets.
