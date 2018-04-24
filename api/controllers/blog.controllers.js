module.exports.blogGetAll = function(req, res) {
    console.log("GET all the blogs!");
    res
     .status(200)
     .json({'Message':'Gotten all the blogs.'});
};

module.exports.blogGetOne = function(req, res) {
    var blogId = req.params.blogId;
    console.log("GET one blog!");
    res
     .status(200)
     .json({'Message':'Gotten all the blogs.', 'id': blogId});
};

module.exports.blogAddOne = function(req, res) {
    var blogData = req.body;
    console.log("POST one or more blogs!");
    res
     .status(201)
     .json({'Message':'Posted blog successfully', 'Data': blogData});
};