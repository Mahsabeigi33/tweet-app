const express = require("express");
const router = express.Router();
const { signup, login  } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    return res.json({ message: "Logged out" });
});

module.exports = router;
// This code sets up the authentication routes for user signup and login.