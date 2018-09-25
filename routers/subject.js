var express = require('express');
var router = express.Router();
var con = require('../database/db_conn');
router.get('/',function(req,res){

	con.query('SELECT * FROM subjects',function(err,result){
		if(err) throw err;
		res.send(result[0].subject_name);
		console.log(result[0].subject_name)
	})
})
module.exports = router;