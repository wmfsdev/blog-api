const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const articleController = require('../controllers/articleController');

require('../config/passport');

router.get('/', indexController.index);

// ARTICLES

router.post('/articles', articleController.article_post);

router.get('/articles', articleController.article_get);

// ELSE

router.get('/signup', indexController.signup_get);

router.post('/signup', indexController.signup_post);

router.get('/signin', indexController.signin_get);

router.post('/signin', indexController.signin_post);

router.get('/protected', indexController.protected);

module.exports = router;
