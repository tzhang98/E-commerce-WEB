const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received token:", token); // Log the token received from the client

  if (token == null) return res.sendStatus(401);

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err); // Log token verification errors
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
