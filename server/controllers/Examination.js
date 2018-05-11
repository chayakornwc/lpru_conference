const config = require('../config');

exports.findById = (req,res,next)=>{
    var course_id = parseInt(req.params.course_id);
    var exam_id = parseInt(req.params.exam_id);
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        connection.query("SELECT * FROM course_exam WHERE course_id =? AND exam_id=? ",[course_id, exam_id], (err, results)=>{
            if(err) return next(err);
            res.send(results[0]);
        })
    })
}
exports.create = (req,res,next)=>{
    var course_id = parseInt(req.params.course_id);
    data = {
        question:req.body.question,
        answer1:req.body.answer1,
        answer2:req.body.answer2,
        answer3:req.body.answer3,
        answer4:req.body.answer4,
        answer_real:rea.body.answer_real
    }
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        connection.query("INSERT INTO course_exam set ? WHERE course_id=?", [data, course_id], (err, results)=>{
            if(err) return next(err);
            res.send({status:200, message:'เพิ่มข้อมูลเรียบร้อยแล้ว'});
        });
    })
}
exports.registers  = (req, res, next)=>{
    var course_id = parseInt(req.body.course_id)
    var data = req.body.members
    var arr = [];
    data.forEach(function(e,i){
        data[i].question = escape(e.question)
        data[i].answer1 = escape(e.answer1)
        data[i].answer2 = escape(e.answer2)
        data[i].answer3 = escape(e.answer3)
        data[i].answer4 = escape(e.answer4)
        data[i].answer_real = parseInt(e.answer_real)
        data[i].course_id = course_id
   })
   data.forEach(function(e,i){
    arr[i] = Object.values(e);
   })
    req.getConnection((err,connection)=>{
        if(err) return next(err);
        connection.query("INSERT INTO course_exam  (question, answer1, answer2, answer3, answer4, answer_real, course_id) values ? ", [arr], (err, results)=>{
            if(err) return next(err);
            res.send({status:200, message:`เพิ่มข้อมูลเรียบร้อยแล้ว จำนวนข้อสอบทั้งหมด ${results.affectedRows} ข้อ`, records:results.affectedRows});
        });
    })
}
    exports.findExambycourse =(req,res,next)=>{
        var id = parseInt(req.params.id);
  
        req.getConnection((err, connection)=>{
            connection.query("SELECT ce.*, c.course_name FROM course_exam ce LEFT OUTER JOIN course c on c.course_id = ce.course_id WHERE ce.course_id = ? GROUP BY ce.exam_id",[id], function(err, results){
                if(err) throw err;
              var data = {
                  members:results,
                 course_name:results[0].course_name
              }
              
              res.send(data);
            })
           
           
        })
    }
exports.findNullexam = (req,res,next)=>{
        req.getConnection((err, connection)=>{
            if(err) return next(err);
            connection.query("SELECT c.*, ex.exam_id from course c LEFT  JOIN course_exam ex ON ex.course_id = c.course_id WHERE  ex.exam_id IS NULL GROUP BY c.course_id", (err, results)=>{
                if(err) return next(err);
                res.send(results);
            })
        })
}
