const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized: No token provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden: Token is invalid or expired
    }

    // Assuming the decoded token payload includes a 'userId' field
    if (!decoded.userId) {
      return res.status(403).json({ message: "Invalid token: user ID missing" });
    }

    req.user = {
      userId: decoded.userId
    };

    next();
  });
};

module.exports = { authenticateToken };

