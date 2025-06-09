const express = require("express");
const router = express.Router();
const { createTweet, getAllTweets, updateTweet , deleteTweet } = require("../controllers/tweetController");
const auth = require("../middlewares/auth");

router.post("/", auth, createTweet);
router.get("/", auth, getAllTweets);
router.put("/:id", auth, updateTweet);
router.delete("/:id", auth, deleteTweet);

module.exports = router;
// This code sets up the tweet routes for creating, retrieving, and updating tweets.
