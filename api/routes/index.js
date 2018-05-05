var express = require('express');
var router = express.Router();

var blogCtrl = require('../controllers/blog.controllers');
var commentCtrl = require('../controllers/comment.controllers');
var userCtrl = require('../controllers/user.controllers');

router
    .route('/blogs')
    .get(blogCtrl.blogGetAll)
    .post(userCtrl.authenticate, blogCtrl.blogAddOne);

router
    .route('/blog/:blogId')
    .get(blogCtrl.blogGetOne)
    .put(userCtrl.authenticate, blogCtrl.blogUpdateOne)
    .delete(userCtrl.authenticate, blogCtrl.blogDeleteOne);

//Comment routes

router
    .route('/blog/:blogId/comment')
    .get(commentCtrl.commentGetAll)
    .post(userCtrl.authenticate, commentCtrl.commentAddOne);

router
    .route('/blog/:blogId/comment/:commentId')
    .get(commentCtrl.commentGetOne)
    .put(userCtrl.authenticate, commentCtrl.commentUpdateOne)
    .delete(userCtrl.authenticate, commentCtrl.commentDeleteOne);

//User routes

router
    .route('/user/register')
    .post(userCtrl.registerUser);

router 
    .route('/user/login')
    .post(userCtrl.loginUser);

router 
    .route('/user/profile')
    .get(userCtrl.authenticate, userCtrl.userProfile);

module.exports = router;