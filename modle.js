var db = require('./db.js');
var gets = {};
gets.loginif=(req,res,next)=>{
	var userInfo=req.body.userinfo;
	console.log(userInfo,'sdflksjfd')
	var qry="select count(*) as num from admin where user='"+userInfo.user+"' and password='"+userInfo.psd+"'";
	db.query(qry,function(err,result){
		if(err){
			console.log('err');
			return;
		}
		if(result[0].num>=1){
			req.session.sign = true;
		}
		res.send(result)
	})
}
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
gets.updateArticle = (req, res, next) => {
	var formdata = req.body.formdata;
	var str = formdata.con;
	str = str.replace(/\"/g, " ");
	str = str.replace(/&#34;/g, "'");
	str = str.replace(/&amp;/g, "");
	str = str.replace(/lt;/g, "<");
	str = str.replace(/gt;/g, ">");
	str = str.replace(/\&/g, "");
	str = str.replace(/\n/g, "<br>");
	var qry = "update article set title='"+formdata.tit+"',content='"+str+"' where id='"+req.body.id+"'";
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
gets.deleteArticle = (req, res, next) => {
	var delId=req.params.id;
	var qry="delete from article where id="+delId+"";
	db.query(qry, function(err, result) {
		if (err) {
			console.log('err')
			return;
		}
		res.redirect('/list')
	})
}
gets.editArticle = (req, res, next) => {
	var editId=req.params.id;
	console.log(editId,'dksfdksfj')
	var qry="select * from article where id="+editId+"";
	db.query(qry, function(err, result) {
		if (err) {
			console.log('err')
			return;
		}
		res.render('edit',{
			data:result
		})
	})
}

module.exports = gets;