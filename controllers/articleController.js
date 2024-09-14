const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Article = require('../models/article');
const Comments = require('../models/comment');

exports.article_get = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({});
  res.json(articles);
});

exports.articleId_get = (req, res, next) => {
  passport.authenticate('jwt', async (err, user, info) => {
    console.log('articleId authenticate');
    const article = await Article.findById(req.params.id)
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'username' },
      });

    if (!user) {
      // if no user not a problem, still render
      return res.status(200).json(article);
      // return res.status(401).json({ message: 'not authorised' });
    }

    article.comments.forEach((comment) => {
      if (comment.userId._id == user.userId) {
        comment.canDelete = true;
      }
    });

    return res.status(200).json(article);
  })(req, res, next);
};

exports.article_post = [

  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please enter a username'),
  body('body')
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    console.log('POST test');
    const errors = validationResult(req);

    const article = new Article({
      title: req.body.title,
      body: req.body.body,
      timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
    // there are errors... react relevant
      //  res.
    } else {
      await article.save();
    }
  }),
];
