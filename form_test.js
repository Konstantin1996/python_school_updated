var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.listen(9000,function(){
	console.log('listen 9000')
});

app.get('',function(req,res){
	console.log(__dirname);
	res.end();
})

app.get('/index',function(req,res){
	var data = {age: 29, body: "tall", favorite_food: "chicken"};
	res.render('index');
	res.end();
})

app.get(['/index/python_lessons','/index/python_lessons_2','/index/python_lessons_3'], function(req,res){
	if(req.url === '/index/python_lessons'){
		res.render('python_lessons',{userCode:""});
	}
	else if (req.url === '/index/python_lessons_2'){
		res.render('python_lessons_2',{userCode:""})
	}
	else if (req.url === '/index/python_lessons_3'){
		res.render('python_lessons_3',{userCode:""})
	}
})

app.post(['/index/python_lessons','/index/python_lessons_2','/index/python_lessons_3'], function(req,res,callback){
	var userCodeReq = req.body.userCodeReq;
	var numberTask = req.body.taskNumber;
	console.log("numberTask = " + numberTask);
	userCodeReq = userCodeReq + numberTask;

	var { spawn } = require("child_process");
	var result = '';
	var process = spawn('python3', ['./python.py', userCodeReq]);

	process.stdout.on('data', (data) => {
		result += data;
	})

	process.stderr.on('data', (data) => {
		result += data;
	})

	process.on('close', (code) => {
		if(req.url === '/index/python_lessons'){
			res.render('python_lessons', {userCode : result});
		} else if(req.url === '/index/python_lessons_2'){
			res.render('python_lessons_2', {userCode : result});
		}else if (req.url === '/index/python_lessons_3') {
			res.render('python_lessons_3', {userCode : result})
		}
		res.end();
	});
})

app.get('*', function(req,res){
	res.send('Opps, something goes wrong');
})
