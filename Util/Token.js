require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  console.log('token page reached')
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: '3 days',
  });
};