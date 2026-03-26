const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Extract token string after strictly "Bearer " if provided that way
    const tokenString = token.startsWith('Bearer') ? token.split(' ')[1] : token;
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET || 'secret');
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
