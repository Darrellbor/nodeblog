var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

//Get all comments
module.exports.commentGetAll = function(req, res) {
    var blogId = req.params.blogId;
    console.log("GET blog!", blogId);

    Blog
        .findById(blogId)
        .select('comments')
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: []
            }
            if(err) {
                console.log('Error finding comments');
                response.status = 500;
                response.message = {
                    err, 
                    message: "An error occured!"
                };
            } else if(!doc) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+ blogId
                }
            } else {
                 console.log('Found comments', doc.comments.length);
                 response.message = doc.comments ? doc.comments : [];
            }
            res 
                .status(response.status)
                .json(response.message)
        });
}

//Get a single comment
module.exports.commentGetOne = function(req, res) {
    var blogId = req.params.blogId;
    var commentId = req.params.commentId;
    console.log("GET comment "+ commentId+" for blog "+blogId);

    Blog
        .findById(blogId)
        .select('comments')
        .exec(function(err, blog) {
            var comment = blog.comments.id(commentId);
            var response = {
                status: 200,
                message: {}
            }
            if(err) {
                console.log('Error finding comments');
                response.status = 500;
                response.message = {
                    err, 
                    message: "An error occured!"
                };
            } else if(!blog) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+ blogId
                }
            } else if(!comment) {
                response.status = 404;
                response.message = {
                    message: 'Comment id not found! '+ commentId
                }
            } else {
                response.message = comment ? comment : {};
            }

            res 
                .status(response.status)
                .json(response.message)
        });
}

var _addComment = function(req, res, blog) {
    blog.comments.push({
        commentBy: {
            user_id: req.user._id,
            name: req.user.name
        },
        comment: req.body.comment
    });

    blog.save(function(err, commentAdded) {
        if(err) {
            res
                .status(500)
                .json({
                    err,
                    message: "An error occured!"
                })
        } else {
            res 
                .status(201)
                .json(commentAdded.comments[commentAdded.comments.length -1])
        }
    });
}

module.exports.commentAddOne = function(req, res) {
    var blogId = req.params.blogId;

    if(!req.body.comment) {
        res 
            .status(400)
            .json({message: 'Please ensure all fields are filled '})
        return;
    }

    Blog
        .findById(blogId)
        .select('comments')
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: []
            }
            if(err) {
                console.log('Error finding comments');
                response.status = 500;
                response.message = {
                    err, 
                    message: "An error occured!"
                };
            } else if(!doc) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+ blogId
                }
            } 
            
            if(doc) {
                _addComment(req, res, doc);
            } else {
                  res 
                    .status(response.status)
                    .json(response.message)
            }
           
        });
}

module.exports.commentUpdateOne = function(req, res) {
    var blogId = req.params.blogId;
    var commentId = req.params.commentId;

    if(!req.body.comment) {
        res 
            .status(400)
            .json({message: 'Comment cannot be empty!'})
        return;
    }

    Blog
        .findById(blogId)
        .select('comments')
        .exec(function(err, blog) {
            var commentInstance = blog.comments.id(commentId);
            var response = {
                status: 200,
                message: {}
            }
            if(err) {
                console.log('Error finding comments');
                response.status = 500;
                response.message = {
                    err, 
                    message: "An error occured!"
                };
            } else if(!blog) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+ blogId
                }
            } else if(!commentInstance) {
                response.status = 404;
                response.message = {
                    message: 'Comment id not found! '+ commentId
                }
            } 
            
            if(response.status !== 200) {
                res 
                    .status(response.status)
                    .json(response.message)
            } else {
                commentInstance.comment = req.body.comment;

                blog.save(function(err, updatedComment) {
                    if(err) {
                        res 
                            .status(500)
                            .json({
                                err, 
                                message: "An error occured!"
                            })
                    } else {
                        res 
                            .status(204)
                            .json()
                    }
                });
            }

            
        });
}

module.exports.commentDeleteOne = function(req, res) {
    var blogId = req.params.blogId;
    var commentId = req.params.commentId;

    Blog
        .findById(blogId)
        .select('comments')
        .exec(function(err, blog) {
            var commentInstance = blog.comments.id(commentId);
            var response = {
                status: 200,
                message: {}
            }
            if(err) {
                console.log('Error finding comments');
                response.status = 500;
                response.message = {
                    err, 
                    message: "An error occured!"
                };
            } else if(!blog) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+ blogId
                }
            } else if(!commentInstance) {
                response.status = 404;
                response.message = {
                    message: 'Comment id not found! '+ commentId
                }
            } 
            
            if(response.status !== 200) {
                res 
                    .status(response.status)
                    .json(response.message)
            } else {
                blog.comments.id(commentId).remove();
                blog.save(function(err, updatedComment) {
                    if(err) {
                        res 
                            .status(500)
                            .json({
                                err, 
                                message: "An error occured!"
                            })
                    } else {
                        res 
                            .status(204)
                            .json()
                    }
                });
            }

            
        });
}