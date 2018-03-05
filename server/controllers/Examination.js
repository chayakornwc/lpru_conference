const config = require('../config');

exports.findById = (req,res,next)=>{
    var course_id = parseInt(req.params.course_id);
    var exam_id = parseInt(req.params.exam_id);
    req.getConntection((err, connection)=>{
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
    req.getConntection((err, connection)=>{
        if(err) return next(err);
        connection.query("INSERT INTO course_exam set ? WHERE course_id=?", [data, course_id], (err, results)=>{
            if(err) return next(err);
            res.send({status:200, message:'เพิ่มข้อมูลเรียบร้อยแล้ว'});
        });
    })
}