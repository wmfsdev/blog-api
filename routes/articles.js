const express = require('express');

const router = express.Router();

const articleController = require('../controllers/articleController');

require('../config/passport');

router.post('/article', articleController.article_post);

// it's the address that shouldn't contain descriptions i.e. GET/POST
// but it is fine to include those "descriptions" in function names like
// article_get

module.exports = router;
