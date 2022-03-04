const jwt = require('jsonwebtoken');

function generateToken(payload) {
  console.log(process.env.RAHASIA);
  return jwt.sign(payload, process.env.RAHASIA);
}
module.exports = {
  generateToken,
};
