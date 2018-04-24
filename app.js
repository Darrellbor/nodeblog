var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('App listening on port ' + port);
});