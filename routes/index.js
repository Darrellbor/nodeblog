var express = require('express');
var router = express.Router();

router
    .route('/')
    .get(function(req, res) {
        console.log("GET received!");
        res
         .status(200)
         .json({'message':'Get request worked!'});
    })
    .post(function(req, res) {
        console.log("POST received!");
        res
         .status(200)
         .json({'message':'Post request worked!'});
    });

module.exports = router;