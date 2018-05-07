//C:\users\DELL\workspace\nodeblog
require('./api/data/db');
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var routes = require('./api/routes');
var bodyParser = require('body-parser');

app.set('port', 3000);

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('App listening on port ' + port);
});