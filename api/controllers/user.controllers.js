var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var db_config = require('../data/db_config');

module.exports.registerUser = function(req, res) {
    console.log('Register a new user');

    User    
        .create({
            email: req.body.email.toLowerCase(),
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) 
        }, function(err, user) {
            if(err) {
                res
                    .status(400)
                    .json(err)
            } else {
                res
                    .status(201)
                    .json(user)
            }
        });

}

module.exports.loginUser = function(req, res) {
    console.log('Login a user');

    User
        .findOne({
            email: req.body.email.toLowerCase()
        })
        .exec(function(err, user) {
            if(err) {
                res
                    .status(400)
                    .json(err)
            } else {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    var token = jwt.sign({ _id: user._id, name: user.name }, db_config.secret, { expiresIn: 86400 }); //expires after 1 day
                    res
                        .status(200)
                        .json({Success: true, token: token})
                } else {
                    res
                        .status(401)
                        .json('Unauthorized!')
                }
                
            }
        });
}

module.exports.authenticate = function(req, res, next) {
    var headerExists = req.headers.authorization;
    
    if(headerExists) {
        var token = req.headers.authorization.split(' ')[1]; //-> Authorization: Bearer vvv
        jwt.verify(token, db_config.secret, function(err, decoded) {
            if(err) {
                console.log(err);
                res
                    .status(401)
                    .json(err)
            } else {
                console.log('Authentication successfull');
                req.user = {
                    _id: decoded._id,
                    name: decoded.name
                };
                next();
            }
        });
    } else {
        res
            .status(403)
            .json('No token provided!')
    }
}