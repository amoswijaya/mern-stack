const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied',
    });
  }
  try {
    const decode = jwt.verify(token, process.env.RAHASIA);
    req.decode = decode;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Token is not valid',
    });
  }
}

module.exports = auth;
