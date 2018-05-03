var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

module.exports.blogGetAll = function(req, res) {
    var count = 5;
    var offset = 0;
    var sort = "-createdOn";
    var maxCount = 15;

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.sort) {
        sort = req.query.sort;
    }

    if(isNaN(offset) || isNaN(count)) {
        res 
            .status(400)
            .json({
                message: 'Please make sure that the query string offset and count are numeric'
            })
        return;
    }

    if(count > maxCount) {
        res 
            .status(400)
            .json({
                message: 'Count limit of '+maxCount+' exceeded!'
            })
        return;
    }

    Blog
        .find()
        .skip(offset)
        .limit(count)
        .sort(sort)
        .exec(function(err, blogs) {
            if(err) {
                console.log('Error finding blogs');
                res
                    .status(500)
                    .json(err)
            } else {
                console.log('Found blogs', blogs.length);
                res
                    .status(200)
                    .json(blogs)
            }
        });
};

module.exports.blogGetOne = function(req, res) {
    var blogId = req.params.blogId;
    console.log("GET blog!", blogId);

    Blog
        .findById(blogId)
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if(err) {
                console.log('Error finding blog');
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+blogId
                }
            }
            res 
                .status(response.status)
                .json(response.message)
        });
};

var _splitArray = function(input) {
    var output;
    if(input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
}

module.exports.blogAddOne = function(req, res) {

   if(!req.body.title || !req.body.preview || !req.body.content || !req.body.categories || !req.body.author_id || !req.body.name) {
        res 
            .status(400)
            .json({message: 'Please ensure all fields are filled '})
        return;
   }

   Blog
        .create({
            title: req.body.title,
            preview: req.body.preview,
            content: req.body.content,
            totalLikes: 0,
            categories: _splitArray(req.body.categories),
            author: {
                author_id: req.body.author_id,
                name: req.body.name
            }     
        }, function(err, blog) {
            if(err) {
                res 
                    .status(400)
                    .json(err)
            } else {
                res
                    .status(201)
                    .json(blog)
            }
        });
};

module.exports.blogUpdateOne = function(req, res) {
    var blogId = req.params.blogId;
    console.log("GET blog!", blogId);

    Blog
        .findById(blogId)
        .select("-comments")
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if(err) {
                console.log('Error finding blog');
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                response.status = 404;
                response.message = {
                    message: 'Blog id not found! '+blogId
                }
            }

            if(response.status !== 200) {
                res 
                    .status(response.status)
                    .json(response.message)
            } else {

                if(req.body.like && isNaN(req.body.like)) {
                    res 
                        .status(400)
                        .json({"message": "Please make sure that like is a numerical value"})
                    return;
                }

                var suppliedData = {
                    title: req.body.title,
                    preview: req.body.preview,
                    content: req.body.content,
                    categories: _splitArray(req.body.categories)
                }

                if(req.body && req.body.like) {
                    var updateLike = doc.totalLikes + parseInt(req.body.like, 10);
                    suppliedData = {
                        totalLikes: updateLike
                    }
                } else if(!req.body.title || !req.body.preview || !req.body.content || !req.body.categories) {
                        res 
                            .status(400)
                            .json({message: 'Please ensure all fields are filled '})
                        return;
                }
                

                Blog
                    .update({
                        _id: blogId
                    }, suppliedData, function(err, updatedBlog) {
                        if(err) {
                            res 
                                .status(500)
                                .json(err)
                        } else {
                            res 
                                .status(204)
                                .json()
                        }
                    });
            }
            
        });
}

module.exports.blogDeleteOne = function(req, res) {
    var blogId = req.params.blogId;

    Blog    
        .findByIdAndRemove(blogId)
        .exec(function(err, blog) {
            if(err) {
                res
                    .status(404)
                    .json(err)
            } else {
                console.log('Blog deleted id:', blogId);
                res
                    .status(204)
                    .json()
            }
        });
}