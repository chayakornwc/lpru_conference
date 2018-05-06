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
exports.findNullexam = (req,res,next)=>{
        req.getConnection((err, connection)=>{
            if(err) return next(err);
            connection.query("SELECT c.*, ex.exam_id from course c LEFT OUTER JOIN course_exam ex ON ex.course_id = c.course_id WHERE  ex.exam_id IS NULL GROUP BY c.course_id", (err, results)=>{
                if(err) return next(err);
                res.send(results)
            })
        })
}