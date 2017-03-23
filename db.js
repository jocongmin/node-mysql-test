var mysql = require('mysql');
var db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'test',
	port:3306
});
db.connect((err)=>{
	if(err){
		console.log('connect fail')
	}else{
		console.log('connect suc')
	}
});
module.exports=db;