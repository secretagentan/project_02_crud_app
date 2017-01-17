// REQUIRE MODULES
var express = require('express');
var favicon = require('serve-favicon');
var mongo = require('mongodb').MongoClient;

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));

// MIDDLEWARE
app.use(express.static(__dirname + '/public'));


// ROUTES




// PORT
var port = 3000;

app.listen(port, function() {
  console.log('Listening on port: ' + port);
});



