var express = require('express');
var app = express();
var gets = require('./modle.js');
var bodyParser = require('body-parser')

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.get('/', function(req, res, next) {
	gets.showArticleHome(req, res, next)
})
app.get('/list', function(req, res, next) {
	gets.showArticle(req, res, next)
})
app.get('/article/:id', function(req, res, next) {
	gets.showArticleInfo(req, res, next)
})

app.get('/write', function(req, res, next) {
	gets.subForm(req, res, next)
})
app.post('/subform', function(req, res, next) {
	gets.saveArticle(req, res, next);
})
app.get('/delete/:id', function(req, res, next) {
	gets.deleteArticle(req, res, next);
})
app.get('/edit/:id', function(req, res, next) {
	gets.editArticle(req, res, next);
})
app.post('/update', function(req, res, next) {
	gets.updateArticle(req, res, next);
})
app.listen(8000)