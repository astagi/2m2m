var express = require('express');
var im = require('imagemagick');
var app = express();
var nosql = require('nosql').load('messages.nosql');

app.use(express.static(__dirname ));
app.use(express.errorHandler());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var allowedFormats = ['png', 'jpeg', 'jpg'];

function isImage(element) {
    for (var i = 0 ; i < allowedFormats.length ; i++)
        if(element.match(allowedFormats[i]+"$"))
            return true;
    return false;
}

app.get('/', function(req, res){
    var fs = require('fs');
    var images = [];
    fs.readdir('photos/thumbs', function (err, files) {
        res.render('index', {photos: files.filter(isImage)}); 
    });          
});

app.get('/photos/list', function(req, res){
    var fs = require('fs');
    var images = [];
    fs.readdir('photos/thumbs', function (err, files) {
        res.send({ photos: files.filter(isImage) });
    });          
});

app.get('/photos/upload', function(req, res){
    res.render('newphoto');
});

app.post('/photos/upload', function(req, res){
    res.send({ 'status': 'OK' })
});

app.get('/messages/list', function(req, res){
    var callback = function(selected) {
        var messages = [];
        selected.forEach(function(o) {
            messages.push(o.message);
        });
        res.send({ messages: messages });
    };
    var map = function(doc) {
        return doc;
    };
    nosql.all(map, callback);          
});

app.get('/messages/upload', function(req, res){
    res.render('newmessage');
});

app.post('/messages/upload', function(req, res){
    var callback = function(count) {
        res.send({ 'status': 'OK' });
    };
    nosql.insert({ message: req.body.message}, callback);
});

server = require('http').createServer(app);

server.listen(3000, function(err) {
    console.log(err, server.address());
});