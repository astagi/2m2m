var express = require('express');
var im = require('imagemagick');
var fs = require('fs');
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
    var images = [];
    fs.readdir('photos/thumbs', function (err, files) {
        res.send({ photos: files.filter(isImage) });
    });          
});

app.get('/photos/upload', function(req, res){
    res.render('newphoto');
});

app.post('/photos/upload', function(req, res){
    var filePath = req.files['photo']['path']; //originalFilename
    var fileName = req.files['photo']['originalFilename']; //originalFilename
    fs.readFile(filePath, function (err, data) {
        var newPath = __dirname + "/photos/" + fileName;
        var thumbPath = __dirname + "/photos/thumbs/" + fileName;
        fs.writeFile(newPath, data, function (err) {
            var im = require("imagemagick");
            im.resize({
                srcPath : newPath,
                dstPath : thumbPath,
                strip : false,
                width : 400,
                height : "400^",
                customArgs: [
                     "-gravity", "center"
                    ,"-extent", "400x400"
                    ]
            }, function(err, stdout, stderr)
            {
                res.send({ 'status': 'OK' });
            });
        });
    });
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

var args = process.argv.slice(2);
var port = 3000;
if (args.length != 0)
    port = args[0];
server.listen(port, function(err) {
    console.log(err, server.address());
});