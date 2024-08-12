require('dotenv').config();

module.exports = {
  PORT: process.env.SERVER_PORT || 2001,
  API_KEY:process.env.API_KEY
};
