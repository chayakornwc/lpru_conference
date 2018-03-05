const config = require('../config')
const timestamp = new Date().toLocaleString();


exports.findAll = (req, res,next) => {
    req.getConnection((err, connection)=>{
<<<<<<< HEAD
        if(err) return next(err)
    
    var sql = "SELECT * FROM course WHERE course_id =? course_name LIKE ? or course_nameEng LIKE ?";
=======
    if(err) return next(err)
    var sql = "SELECT * FROM course WHERE course_name like ? OR course_nameEng like ?";
>>>>>>> ae2f9afd4684c9412b08b3eeb11697fb4ef08fd9
    var params ="%"+req.query.term+"%";
    connection.query(sql, [req.query.term, params, params], (err, results)=>{
        if (err) return next(err)
        res.send(results)
        })
    })
}

exports.findById = (req, res, next) =>{
    var id = parseInt(req.params.id)
    req.getConnection((err, connection)=>{
        if(err) return next(err)
        connection.query("SELECT * FROM course where course_id=?",[id], (err, row)=>{
            if(err) return next(err)
            res.send(row[0])
        })
    })
}
exports.create = (req, res, next)=>{
    var  data = {
        course_name: req.body.course_name,
        course_nameEng:req.body.course_nameEng,
        course_log:req.body.remark,
        course_status:req.body.course_status,
        time_stamp:timestamp,
    }      
    req.getConnection((err, connection)=>{
        if(err) return next(err)
        connection.query("SELECT * FROM course WHERE course_name=? OR course_nameEng=?",[data.course_name, data.course_nameEng], function(err, results){
            var isSave = false;
            if(results.length >0 ){
                res.send({status:201, message:'ตรวจพบ หลักสูตรนี้ ในระบบ'})
            }else{
                isSave  = true;
            }
            if(isSave){
                connection.query("INSERT INTO course set ?", data, (err,result)=>{
                    if(err) return next(err)
                    res.send(result)
                })
            }
        });
       
    })    
}
exports.update = (req, res, next) =>{
    var id =parseInt(req.params.id)
    var data = {
        course_name: req.body.course_name,
        course_nameEng:req.body.course_nameEng,
        course_log:req.body.remark,
        course_status:req.body.course_status,
        time_stamp:timestamp,
    }
    req.getConnection(function(err, connection){
        connection.query("SELECT * FROM course WHERE course_name=? OR  course_nameEng=?",[data.course_name, data.course_nameEng], function(err, results){
            if (err) return next(err)
            var isUpdate = false;
            if(results.length > 0){
                if(results[0].course_id !== id){
                    res.send({status:201, message:'ตรวจพบ หลักสูตรนี้ ในระบบ'})
                }else {
                    isUpdate = true;
                }
            }else{
               isUpdate = true;
            }
            if(isUpdate){ //ตรวจสอบ ว่าสามารถอัพเดทได้หรือไม่ แล้วทำการอัพเดท     
                connection.query("UPDATE course SET ? WHERE course_id=?", [data, id], function(err, results){
                        if(err) return next(err)
                        if(results){
                              res.send({status:200, message:'แก้ไขข้อมูลเรียนร้อยแล้ว'});
                        }else{
                            res.send({status:201, message:'เกิดข้อผิดพลาดกรุณาลองใหกม่อีกครั้ง'});
                        }
                      
                })
            }else{
                res.send({status:201, message:'เกิดข้อผิดพลาดกรุณาลองใหกม่อีกครั้ง'});
            }
        })
    })
}
exports.delete = (req, res, next)=>{
    var id = parseInt(req.params.id)
        req.getConnection(function(err, connection){
            connection.query("DELETE FROM course WHERE course_id=?",[id], function(err, results){
                if(err) return next(err)
                if(results.length>0){
                        res.send({status:200, message:'ลบข้อมูลเรียบร้อยแล้ว'})
                }else{
                    res.send({status:201, message:'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'})
                }
            })
        })
}