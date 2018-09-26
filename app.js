var express = require('express');
var ejs = require('ejs');
var app = express();
var bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash());

var branch_router = require('./routers/branch')
var hostel_router = require('./routers/hostel')
var subject_router = require('./routers/subject')
var student_router = require('./routers/student')
app.set('view engine','ejs');
app.use('/',express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/branch',branch_router);
app.use('/hostel',hostel_router);
app.use('/subject',subject_router);
app.use('/student',student_router);
app.get('/',function(req,res){
	res.redirect('/student');
});
app.listen(process.env.PORT||8080,function(){
	console.log("running on port 3000");
});
