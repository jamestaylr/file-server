// Native Library Imports
var http = require('http');

// Dependency Library Imports
var express = require('express');

// Defines the port the server will run on
var port = 8080;

// Create Express and set up the EJS view engine
var app = express();
app.set('view engine', 'ejs');
app.use("/content", express.static(__dirname + "/content"));

// Setup the index page view
app.get('/', function(req, res) {
    res.render('main');
});

// Defines error handling
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// Bind the server process on the port
var server = app.listen(port, function() {
    console.log("Server successfully started at address: %s:%s!", server.address().address, server.address().port);
});



