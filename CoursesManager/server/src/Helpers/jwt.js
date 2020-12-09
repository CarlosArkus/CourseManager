const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const generateToken = (uid) => {
  const payload = {
    uid
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    }, (err, token) => {
      if (err) {
        reject('Cant generate token');
      }
      else {
        resolve(token);
      }
    });
  });
}

module.exports = generateToken;
