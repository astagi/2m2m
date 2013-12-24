var express = require('express');
var im = require('imagemagick');
var app = express();

var pub = __dirname;
app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler());
app.set('views', pub);
app.set('view engine', 'ejs');

var allowedFormats = ['png', 'jpeg', 'jpg'];

function isImage(element) {
    for (var i = 0 ; i < allowedFormats.length ; i++)
        if(element.match(allowedFormats[i]+"$"))
            return true;
    return false;
}

app.get('/photos/list', function(req, res){
    var fs = require('fs');
    var images = [];
    fs.readdir('photos/thumbs', function (err, files) {
        res.send({ photos: files.filter(isImage) });
    });          
});

app.get('/', function(req, res){
    var fs = require('fs');
    var images = [];
    fs.readdir('photos/thumbs', function (err, files) {
        res.render('index', {photos: files.filter(isImage)}); 
    });          
});

app.listen(3000);