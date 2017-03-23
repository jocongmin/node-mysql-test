var db = require('./db.js');
var gets = {};
gets.findAll = (req, res, next) => {
	var qry = "select * from user";
	var qry2 = "select * from user_next";
	db.query(qry, function(err, result) {
		if (err) {
			console.log('err');
			return;
		}
		db.query(qry2, function(err, result2) {
			res.render('home', {
				data: result,
				data2: result2,
				title: 'home'
			});
		})
	});
}
gets.subForm = (req, res, next) => {
	res.render('write', {})
}

gets.showArticle = (req, res, next) => {
	db.query('select * from article', function(err, result) {
		if (err) {
			console.log('not get article')
			return;
		}
		res.render('list', {
			data: result
		})
	})
}
gets.showArticleHome = (req, res, next) => {
	db.query('select * from article', function(err, result) {
		if (err) {
			console.log('not get article')
			return;
		}
		res.render('home', {
			data: result
		})
	})
}
gets.showArticleInfo = (req, res, next) => {
	var id = req.params.id;
	db.query("select * from article where id=" + id + "", function(err, result) {
		if (err) {
			console.log('not get article')
			return;
		}
		res.render('info', {
			data: result
		})
	})
}
gets.saveArticle = (req, res, next) => {
	var formdata = req.body.formdata;
	console.log(typeof(formdata.tit));
	var str = formdata.con;
	str = str.replace(/\"/g, " ");
	str = str.replace(/&#34;/g, "'");
	str = str.replace(/&amp;/g, "");
	str = str.replace(/lt;/g, "<");
	str = str.replace(/gt;/g, ">");
	str = str.replace(/\&/g, "");
	str = str.replace(/\n/g, "<br>");
	var qry = "insert into article (title,content) values ('" + formdata.tit + "', '" + str + "')";
	console.log(qry)
	db.query(qry, function(err, result) {
		if (err) {
			console.log('err')
			return;
		}
		res.send({
			state: true
		})
	})
}
module.exports = gets;