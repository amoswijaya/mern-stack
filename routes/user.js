const routes = require('express').Router();
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helper/hash');
const { generateToken } = require('../helper/jwt');
routes.post('/register', async (req, res) => {
  const newUser = new User({
    nickname: req.body.nickname,
    password: await hashPassword(req.body.password),
  });
  newUser.save((err, user) => {
    if (err) {
      res.status(500).json({
        message: 'Error registering new user please try again',
        error: err,
      });
    } else {
      res.status(201).json({
        message: 'User created successfully',
        user,
      });
    }
  });
});

routes.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  const user = await User.findOne({ nickname });
  if (!user) {
    res.status(401).json({
      message: 'Incorrect nickname or password',
    });
  } else {
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Incorrect nickname or password',
      });
    } else {
      const token = generateToken({
        _id: user._id,
        nickname: user.nickname,
      });
      res.status(200).json({
        message: 'User logged in successfully',
        token,
      });
    }
  }
});

module.exports = routes;
