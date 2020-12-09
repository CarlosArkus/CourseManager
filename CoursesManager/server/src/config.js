require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_CONNECTION,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'sup4S3cuR0to'
}