// ========================================
//  REQUIRE MODULES
// ========================================
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));

// ========================================
//  VIEW ENGINE - HANDLEBARS
// ========================================
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

// ========================================
//  MIDDLEWARE
// ========================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========================================
//  ROUTES
// ========================================

// home page / default
app.get('/', function(req, res, next) {
  res.render('index', {title: 'To-Do List :', header: 'Add Tasks'});
});

app.get('/userstories', function(req, res, next) {
  res.render('stories', {title: 'User Stories :'});
});

app.get('/wireframes', function(req, res, next) {
  res.render('wireframes', {title: 'Wireframes :'});
});

// **************
// Crud - Create
// **************
app.post('/posts', function(req, res, next) {
  // console.log('req.body.todo', req.body.todo);
  var doc = { message: req.body.todo };
  mongo.connect(url, function(err, db) {
    // inserts input value as a doc in the todos db
    db.collection('todos').insertOne(doc, function(err, result) {
      db.close();
      // displays the data as json
      res.json(result);
    });
  });
});

// **************
// cRud - Read
// **************
app.get('/posts', function(req, res, next) {
  mongo.connect(url, function(err, db) {
// finds all data from todos collection and displays as an array
    db.collection('todos').find({}).toArray( function(err, result) {
      // console.log(result);
      db.close();
      // displays the data as json
      res.json({todos: result});
    });
  });
});

// **************
// crUd - Update
// **************
app.post('/update', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.body.oid;
    // console.log(id);
    console.log(req.body);
    var updatedDoc = {message: req.body.todo};
    console.log(updatedDoc);
    db.collection('todos').updateOne({"_id": objectId(id)}, {$set: updatedDoc}, function(err, result) {
      console.log("Item updated: " + id);
      db.close();
      res.redirect('/');
    });
  });
});

// **************
// cruD - Delete
// **************
app.post('/delete/:id', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.params.id;
    db.collection('todos').deleteOne({"_id": objectId(id)}, function(err, result) {
      // console.log("Item deleted: " + id);
      db.close();
      res.redirect('/');
    });
  });
});


// ========================================
//  PORT
// ========================================
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port: ' + port);
});
