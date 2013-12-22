var express = require('express');
var app = express();

var pub = __dirname;
app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler());
app.set('views', pub);
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    var fs = require('fs');
    fs.readdir('photos', function (err, files) {
        res.render('index', {photos: files});
    });
});

app.listen(3000);