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
    var newData = [];
    var arr = [];
    var respose ={};
    req.getConnection((err, connection)=>{
        if(err) throw err;
         connection.query("DELETE FROM course_exam WHERE course_id = ? ",id, function(err, results){
            if(err) throw err;
            data.forEach(function(e,i){
                newData.push({
                    question: escape(e.question),
                    answer1: escape(e.answer1),
                    answer2: escape(e.answer2),
                    answer3:escape(e.answer3),
                    answer4:escape(e.answer4),
                    answer_real:parseInt(e.answer_real),
                    course_id:id
                })
             
           })
         
           newData.forEach(function(e,i){
            arr[i] = Object.values(e);
           })
           connection.query("INSERT INTO course_exam  ( question, answer1, answer2, answer3, answer4, answer_real, course_id) values ?", [arr], (err,results)=>{
               if(err) throw err;
               res.send({status:200, message:"แก้ไขข้อมูลเรียบร้อยแล้ว"});
           })
          
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
            if(err) throw (err);
            connection.query("SELECT * FROM afterExamination WHERE exam_id = ? AND per_id = ? AND registration_id=?",[data[0].exam_id,data[0].per_id, data[0].registration_id], function(err, results){
               if(err) console.log(err);
               if(results.length > 0){
                res.send({ status: 201, message: 'พบการสอบ ของพีเรียดและผู้ใช้ หากท่านยังไม่ได้สอบในหลักสูตรนี้ กรุณาติดต่อผู้ดูแล'})
               }else{
                   connection.query("INSERT INTO afterExamination (exam_id, answer, per_id, course_id, registration_id) values ?", [arr], function(err, results){
                    if(err) throw (err);
                    console.log(arr)
                        
                   })
                  
                   var per_id = parseInt(data[0].per_id);
                   var reg_id = parseInt(data[0].registration_id);
                 
                   connection.query("SELECT sum(score) as totalScore, count(exam_id) as maximumScore, per_id FROM (SELECT CE.exam_id as exam_id, CE.course_id, CE.answer_real, AE.answer, AE.per_id as per_id, (CASE WHEN CE.answer_real = AE.answer THEN 1 ELSE 0 END)as score FROM course_exam CE LEFT JOIN afterExamination AE ON AE.course_id = CE.course_id WHERE AE.registration_id = ? AND per_id = ? GROUP BY AE.exam_id, per_id ) as dekg GROUP BY per_id ", [reg_id, per_id],function(err, results1){
                        if(err) throw err;
                        connection.query("SELECT count(exam_id) as maximumScore, per_id FROM (SELECT CE.exam_id as exam_id, AE.per_id as per_id FROM course_exam CE LEFT OUTER JOIN afterExamination AE ON AE.course_id = CE.course_id WHERE AE.registration_id = ? AND per_id = ? GROUP BY CE.exam_id, per_id ) as dekg GROUP BY per_id ORDER BY per_id DESC",[reg_id, per_id], function(err, results2){
                             if(err) throw err;      
                        var isGenerator = false
                        if(results1[0].totalScore >= (results2[0].maximumScore * 0.8)){
                            isGenerator = true
                        }
                        var certificationData = [parseInt(makeid()), reg_id, per_id];
                  
                        if(isGenerator){
                            connection.query("INSERT INTO certification (iat, registration_id, per_id) values(?, ?, ?)",[makeid(), reg_id, per_id], function(err, results3){
                                if(err) console.log(err)
                            })
                        }
                        res.send({message:'ส่งข้อสอบเรียบร้อยแล้ว'})
                            })
                   })
               }
            
            })
        })
    
    }
    exports.userChecker = (req, res, next)=>{
        var per_id = req.params.per_id ;
        var registration_id = req.params.sub
        var totalSum = 0;
        var count = 0;
        req.getConnection((err, connection)=>{
            if(err) return next(err);
            
            connection.query("SELECT CE.course_id, CE.answer_real, AE.answer, (CASE WHEN CE.answer_real = AE.answer THEN 1 ELSE 0 END)as score FROM course_exam CE LEFT JOIN afterExamination AE ON AE.course_id = CE.course_id WHERE AE.per_id = ? AND AE.registration_id = ?  GROUP BY AE.exam_id ",[per_id, registration_id],function(err, results){
                if(err) console.log(err)
                if(results.length <= 0){
                    res.send({certification:false, message:'คุณยังไม่สอบหลักสูตรนี้',  state:'none'})
                }else{
                    results.forEach(function(e,i){
                        return totalSum += e.score
                     });
                     connection.query("SELECT count(exam_id) as count FROM course_exam WHERE course_id",[results[0].course_id], function(err,results){
                         if(err) console.log(err)
                         count =results[0].count;
                         if(totalSum >= (count * 0.8)){
                             res.send({certification:true, message:'คุณสอบผ่านการอบรมหลักสูตรนี้', state:'done'});
                         }else{
                             res.send({certification:false, message:'เสียใจด้วยคุณสอบตก', score:totalSum, minScore:count * 0.8, state:'done'});
                         }
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
function makeid() {
    var text = "";
    d = new Date(); 
    text += d.getDate().toString()+d.getMonth().toString()+d.getYear().toString();
    return text;
  }

  