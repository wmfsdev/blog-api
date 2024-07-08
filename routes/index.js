const express = require('express');

const router = express.Router();
const indexController = require('../controllers/indexController');

require('../config/passport');

router.get('/', indexController.index);

router.get('/signup', indexController.signup_get);

router.post('/signup', indexController.signup_post);

router.get('/signin', indexController.signin_get);

router.post('/signin', indexController.signin_post);

module.exports = router;
