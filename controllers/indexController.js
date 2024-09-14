const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Article = require('../models/article');

exports.index = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({});
  console.log(articles);
//  res.json(articles);
});

exports.signin_get = asyncHandler(async (req, res) => {
  // GET request on signin probably unnecessary
  res.render('sign_in');
});

exports.signin_post = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('authenticate execute');

    if (!user) {
      return res.status(401).json(info);
    }
    if (user) {
      const token = jwt.sign({ userId: user._id }, 'your-256-bit-secret');
      return res.json({ token });
    }
  })(req, res, next);
};

exports.protected = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (!user) {
      return res.status(401).json({ message: 'not authorised' });
    }
    // req.user = user.userId
    console.log("auth user ", user) // {userId and iat}
    return res.status(200).json(info);
  })(req, res, next);
};

exports.signup_get = asyncHandler(async (req, res) => {
  res.render('signup');
});

exports.signup_post = [

  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please enter a username'),
  body('password')
    .isLength({ min: 1 }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    if (!errors.isEmpty()) {
      // there are errors
      res.send({ message: 'user create fail' });
    } else {
      await user.save();
      res.send({ message: 'user created' });
    }
  }),

];
