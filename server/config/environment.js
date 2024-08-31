require('dotenv').config();

module.exports = {
  PORT: process.env.SERVER_PORT || 2000,
  API_KEY:process.env.API_KEY
};