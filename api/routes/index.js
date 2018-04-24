var express = require('express');
var router = express.Router();

var blogCtrl = require('../controllers/blog.controllers');

router
    .route('/blogs')
    .get(blogCtrl.blogGetAll)
    .post(blogCtrl.blogAddOne);

router
    .route('/blog/:blogId')
    .get(blogCtrl.blogGetOne);

module.exports = router;