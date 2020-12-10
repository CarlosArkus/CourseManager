require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_CONNECTION,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET
}