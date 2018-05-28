var express = require('express');

// var SandCastle = require('sandcastle').SandCastle;

// var sandcastle = new SandCastle();



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
	res.render('index', { name: "Jordon Levis", person_data: data.age});
	res.end();
})

app.get('/index/python_lessons', function(req,res){
	res.render('python_lessons', {smth : "HZ"});
	res.end();
})
// var result = '';
app.post('/index/python_lessons', function(req,res,callback){
	var userCodeReq = req.body.userCodeReq;
	var { spawn } = require("child_process");
	var TOTAL_OUTPUT = ''

	var process = spawn('python3', ['./python.py', userCodeReq]);

	process.stdout.on('data', (data) => {
		TOTAL_OUTPUT += data;
	})

	process.stderr.on('data', (data) => {
		TOTAL_OUTPUT += data;
	})
	
	process.on('close', (code) => {
		res.render('python_lessons_answer', {userCode : TOTAL_OUTPUT});
		console.log(`child process exited with code ${code}`);
		res.end();
	});
})

	// console.log(req.body.userCodeReq);


app.get('/user/submit',function(req,res){
	res.sendFile(__dirname +'/form.html');
})


// var exec = require ('child_process').exec

// exec('ipconfig',function(err, stdout, stderr){
// 	console.log(stdout);
// })


app.post('/user/submit', function(req,res) {
	console.log(req.body.name_field);
	res.send('you enter button body-parser info: ' + req);
	res.end();
})

app.get('*', function(req,res){
	res.send('Opps, something goes wrong');
})

