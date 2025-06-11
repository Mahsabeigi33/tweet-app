const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Authorization header required" });

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId =  decoded.id;
    if (!req.userId) {
      console.log("❌ req.userId is undefined!");
      return res.status(403).json({ error: "Invalid token structure" });
    }
    next();
  } catch {
    console.error("Token verification failed:");
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
