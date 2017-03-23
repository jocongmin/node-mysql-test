var express = require('express');
var app = express();
var gets = require('./modle.js');
var bodyParser = require('body-parser');
var session = require('express-session')
app.use(session({
	secret: 'shixinke',
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: false
	}
}));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.get('/', function(req, res, next) {
	gets.showArticleHome(req, res, next)
})
app.get('/login', function(req, res, next) {
	res.render('login');
})
app.get('/outlogin', function(req, res, next) {
	req.session.sign = false;
	res.redirect('/');
})
app.post('/loginif', function(req, res, next) {
	gets.loginif(req, res, next);
})
app.set('trust proxy', 1) // trust first proxy

app.get('/list', function(req, res, next) {
	if (req.session.sign) {
		gets.showArticle(req, res, next)
	} else {
		res.send('you don,t have login')
	}
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
	if (req.session.sign) {
		gets.editArticle(req, res, next);
	}else{
		res.send('you don,t have login in')
	}
})
app.post('/update', function(req, res, next) {
	gets.updateArticle(req, res, next);
})
app.listen(8000)