var express = require('express');
var router = express.Router();
var con = require('../database/db_conn');
router.get('/',function(req,res){

	con.query('SELECT * FROM hostels',function(err,result){
		if(err) throw err;
		res.send(result);
		console.log(result)
	})
})
router.get('/insert',function(req,res){
	con.query("INSERT INTO hostels VALUES(2,'J')",function(err,result){
		if(err) throw err;
		res.send(result);
		console.log(result)
	})	
})
router.get('/update',function(req,res){
	con.query(" UPDATE hostels SET hostel_name = 'E' WHERE hostel_id = 1 ",function(err,result){
		if(err) throw err;
		res.send(result);
		console.log(result)
	})	
})
module.exports = router;