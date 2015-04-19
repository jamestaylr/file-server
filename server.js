// Native Library Imports
var http = require('http');
var fs = require("fs");

// Dependency Library Imports
var express = require('express');

// Defines the port the server will run on
var port = 8080;

// Create Express and set up the EJS view engine
var app = express();
app.set('view engine', 'ejs');

// Mount the public directory at the root of the web server
app.use("/", express.static(__dirname + "/public"));

// Setup the index page view
app.get('/', function(req, res) {
    res.redirect('/content');
});

app.get('/content/*', function(req, res) {
    var dir = './public' + req.url;

    try {
        var files = fs.readdirSync(dir);

        for (var i = 0; i < files.length; i++) {
            var stat = fs.statSync(dir + files[i]);

            files[i] = {
                'name': files[i],
                'properties': stat
            };
        }

    } catch (e) {
        var files = [];

    }

    res.render('main', {
        'files': files,
        'location': req.url.split('/').slice(2).join().replace(/,/g, '/')
    });

});

// Defines error handling
app.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {
            url: req.url
        });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

// Bind the server process on the port
var server = app.listen(port, function() {
    console.log("Server successfully started at address: %s:%s!", server.address().address, server.address().port);
});


app.locals.bytesToSize = function(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

app.locals.formatDate = function(string) {
    var d = new Date(string);
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return weekday[d.getDay()] + " " + month[d.getMonth()] + " " + d.getDate();
}