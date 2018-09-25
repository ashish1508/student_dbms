function search_rooms(arr){
	var s=0;
	if(arr[s].room_sid==null)
		return [arr[s].room_hid,arr[s].room_no];
	if(arr[s].room_sid!=null)
		return [" "," "];
}




var express = require('express');
var router = express.Router();

var con = require('../database/db_conn');
var value=105;

router.get('/',function(req,res){
	res.render('../public/student_index');
})

router.get('/create',function(req,res){
	res.render('../public/student_create');
})

router.post('/create',function(req,res){
	console.log(req.body)
	var s = req.body;
	value++;
	var query1 = "INSERT INTO students (student_id,student_name,student_roll,student_hid,student_branch,student_curr_sem) VALUES ("+value+","+"'"+s.name+"'"+
				','+s.roll_no+','+s.hostel_id+','+"'"+s.branch+"'"+','+s.sem+")";
	console.log(query1);
	con.query(query1,function(err,result1){
		if(err) throw err;
		console.log('success');
		var query2 = "SELECT * FROM rooms";
		con.query(query2,function(err,result2){
			if(err) throw err;
			var i = search_rooms(result2);
			var query3 = "UPDATE rooms SET room_sid = "+value+" WHERE room_hid="+i[0]+" AND room_no="+"'"+i[1]+"'";
			console.log(query3);
			console.log(i);
				con.query(query3,function(err,result3){
					if(err) throw err;
					console.log("rooms table updated...");
						var query4 = "INSERT INTO student_subject (stu_sub_sid,stu_sub_subcode) SELECT "+value+",s_code from branch_subjects WHERE b_code='"+s.branch+"' and semester ="+s.sem;
						con.query(query4,function(err,result4){
							if(err) throw err;
							console.log("student_subjects updated.....");
							req.flash('info', 'success!!');
							res.redirect('/student/')
						})

				})
		})
		
	})

})

router.get('/',function(req,res){
	res.send('index page');
})


router.get('/delete',function(req,res){
	res.render('../public/student_delete');
})
router.post('/delete',function(req,res){
	console.log(req.body);
	var r = req.body;
	query1 = "DELETE  FROM students WHERE student_name="+"'"+r.name+"'"+" AND student_roll="+r.roll_no+" AND student_branch="+"'"+r.branch+"'";
	con.query(query1,function(err,result1){
		if(err) throw err;
		console.log('student deleted..');
		res.redirect('/student/')
	})
})

router.get('/update',function(req,res){
	res.render('../public/student_update');
	
})

router.post('/update',function(req,res){
	console.log(req.body);
	var r = req.body;
	var obj = {};
	query1 = "SELECT  * FROM students WHERE student_name="+"'"+r.name+"'"+" AND student_roll="+r.roll_no+" AND student_branch="+"'"+r.branch+"'";
	con.query(query1,function(err,result1){
		if(err) throw err;
		console.log(result1[0]);
		var details = result1[0];
		obj = {
			"name" : details.student_name,
			"roll" : details.student_roll,
			"hid" : details.student_hid,
			"branch" : details.student_branch,
			"semester":details.student_curr_sem
		}
		res.render('../public/student_update2',{obj:obj});
	})

	//res.redirect('/student/updateinfo');
})
router.post('/update2',function(req,res){
	var r = req.body;
	var query1 = "SELECT  student_id FROM students WHERE student_name="+"'"+r.name+"'"+" AND student_roll="+r.roll_no+" AND student_branch="+"'"+r.branch+"'";
	con.query(query1,function(err,result1){
		if(err) throw err;
		var sid
		console.log(result1);
		var query2 = "SELECT room_hid,room_no FROM rooms WHERE room_sid = "+result1[0].student_id;
		con.query(query2,function(err,result2){
			if(err) throw err;
			console.log(result2);
			var hostel = result2[0].room_hid;
			var query3 = "DELETE  FROM students WHERE student_name="+"'"+r.name+"'"+" AND student_roll="+r.roll_no+" AND student_branch="+"'"+r.branch+"'";
			con.query(query3,function(err,result3){
				if(err) throw err;
				var s = req.body;
				value++;
				var query4 = "INSERT INTO students (student_id,student_name,student_roll,student_hid,student_branch,student_curr_sem) VALUES ("+value+","+"'"+s.name+"'"+
				','+s.roll_no+','+s.hostel_id+','+"'"+s.branch+"'"+','+s.sem+")";
				con.query(query4,function(err,result4){
					if(err) throw err;
					console.log(result4);
					query5  = "UPDATE rooms SET room_sid="+value+" WHERE room_hid="+result2[0].room_hid+" AND "+"room_no="+"'"+result2[0].room_no+"'";
					con.query(query5,function(err,result5){
						if(err) throw err;
						console.log('room changed succesfully....');
						var query6 = "INSERT INTO student_subject (stu_sub_sid,stu_sub_subcode) SELECT "+value+",s_code from branch_subjects WHERE b_code='"+s.branch+"' and semester ="+s.sem;
						con.query(query6,function(err,result6){
							if(err) throw err;
							console.log("student_subjects updated.....");
							res.redirect('/student/')
						})
					})
				})
			})
		})
	})
})


module.exports = router;