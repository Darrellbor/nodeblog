var express = require('express');
var router = express.Router();

var blogCtrl = require('../controllers/blog.controllers');
var commentCtrl = require('../controllers/comment.controllers');

router
    .route('/blogs')
    .get(blogCtrl.blogGetAll)
    .post(blogCtrl.blogAddOne);

router
    .route('/blog/:blogId')
    .get(blogCtrl.blogGetOne)
    .put(blogCtrl.blogUpdateOne)
    .delete(blogCtrl.blogDeleteOne);

//Comment routes

router
    .route('/blog/:blogId/comment')
    .get(commentCtrl.commentGetAll)
    .post(commentCtrl.commentAddOne);

router
    .route('/blog/:blogId/comment/:commentId')
    .get(commentCtrl.commentGetOne)
    .put(commentCtrl.commentUpdateOne)
    .delete(commentCtrl.commentDeleteOne);

module.exports = router;