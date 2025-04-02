const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = {
  authenticate: (req, res, next) => {
    const token = req.cookies?.token; // Read token from cookies
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded; // Attach decoded user info to the request
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  },
};
