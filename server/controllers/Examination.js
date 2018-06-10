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
exports.update = (req, res,next)=>{
    var id = parseInt(req.params.id);
    var data = req.body.members
    var update_arr = [];
    var insert_arr = [];
    var respose ={};
    req.getConnection((err, connection)=>{
         connection.query("SELECT exam_id FROM course_exam where course_id = ? ORDER BY exam_id ASC ",id, function(err, results){
            if(err) return next(err);
            data.forEach((e,i)=>{
                if(!e.exam_id){
                  insert_arr.push(e)
                  data.splice(i,1);
                }else{
                    results.forEach((value,key)=>{
                        if(e.exam_id == value.exam_id){
                            results.splice(key,1);
                            update_arr.push(e)
                        }
                    })
                }
            })
            // update zone

            if(update_arr.length>0){
                update_arr.forEach((e, i)=>{
                    dataUpdate = {
                        question:escape(e.question),
                        answer1:escape(e.answer1),
                        answer2:escape(e.answer2),
                        answer3:escape(e.answer3),
                        answer4:escape(e.answer4),
                        answer_real:parseInt(e.answer_real)
                    }
                        connection.query("UPDATE course_exam SET ? WHERE exam_id = ?",[dataUpdate, e.exam_id], function(err, results){
                            if(err){
                                console.log(err.message)
                                throw err;
                            }

                        })
                   })
            }
            // insert module
           if(insert_arr.length > 0){
            insert_arr.forEach((e, i)=>{
                insert_arr[i].question = escape(e.question)
                insert_arr[i].answer1 = escape(e.answer1)
                insert_arr[i].answer2 = escape(e.answer2)
                insert_arr[i].answer3 = escape(e.answer3)
                insert_arr[i].answer4 = escape(e.answer4)
                insert_arr[i].answer_real = parseInt(e.answer_real)
                insert_arr[i].course_id = id
                insert_arr = Object.values(e)
               })
                connection.query("INSERT INTO course_exam  (question, answer1, answer2, answer3, answer4, answer_real, course_id) values ? ", [insert_arr], (err, results)=>{
                    if(err) return next(err);
                   return respose.insert = {status:200, message:`เพิ่มข้อมูลเรียบร้อยแล้ว จำนวนข้อสอบทั้งหมด ${results.affectedRows} ข้อ`, records:results.affectedRows};
                });
           }
           // delete zone
           if(results.length > 0){
            results.forEach((e, i)=>{
                connection.query("DELETE FROM course_exam where course_id = ?", e.exam_id, function(err, results){
                    if (err){
                        console.log(err);
                        throw err;
                    }
                  return  respose.delete = {rowDelete:i}
            })
           })
         }
         res.send({status:200, message:"แก้ไขข้อมูลเรียบร้อยแล้ว"});
        })

    })
}
    exports.findExambycourse =(req,res,next)=>{
        var id = parseInt(req.params.id);
        req.getConnection((err, connection)=>{
            if(err) return next(err);
            
            connection.query("SELECT ce.*, c.course_name FROM course_exam ce LEFT OUTER JOIN course c on c.course_id = ce.course_id WHERE ce.course_id = ? GROUP BY ce.exam_id ORDER BY ce.exam_id ASC",[id], function(err, results){
                var data = {
                    members:results,
                   course_name:results[0].course_name,
                   course_id:results[0].course_id
                }
                connection.query("SELECT count(exam_id) as count from course_exam WHERE course_id = ?",[id], function(err, results){
                    if(err) throw err;
                    data.CountOfexam = results[0].count;
                    res.send(data);
                })
            })        
        })
    }

    exports.userExaminationCreate = (req,res,next)=>{
        let arr = [];
        let data = [];
        var i = 0 ;
        for(var key  in req.body.values){
            data[i] = {
                exam_id:key.split('exam').join(''), answer:req.body.values[key], per_id:req.body.information.per_id, course_id:req.body.information.course_id, registration_id:req.body.information.sub
            }
            i++;
        }
        data.forEach(function(e,i){
           arr[i] = Object.values(e);
           })
        req.getConnection((err, connection)=>{
            if(err) return next(err);
            connection.query("SELECT * FROM afterExamination WHERE exam_id = ? AND per_id = ? AND registration_id=? ",[data[0].exam_id,data[0].per_id, data[0].registration_id], function(err, results){
               if(err) console.log(err);
               if(results.length > 0){
                res.send({ status: 201, message: 'พบการสอบ ของพีเรียดและผู้ใช้ หากท่านยังไม่ได้สอบในหลักสูตรนี้ กรุณาติดต่อผู้ดูแล'})
               }else{
                   connection.query("INSERT INTO afterExamination (exam_id, answer, per_id, course_id, registration_id) values ?", [arr], function(err, results){
                        if(err) return next(err);
                        res.send({message:'ส่งข้อสอบเรียบร้อยแล้ว'})
                   })
               }
            
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
