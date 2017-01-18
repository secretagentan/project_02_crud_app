// REQUIRE MODULES
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var mongo = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));

// VIEW ENGINE - HANDLEBARS
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

// MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/', function(req, res, next){
  res.render('index.hbs', {title: 'Add To-Dos', header: 'To-Do List'});
});

// PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port: ' + port);
});



