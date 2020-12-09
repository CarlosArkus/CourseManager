const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Access denied'
    });
  }

  const { uid } = jwt.verify(token, config.JWT_SECRET);

  req.uid = uid;

  next();

}

module.exports = {
  verifyToken
}
