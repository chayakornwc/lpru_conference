import { connect } from "http2";

const timestamp = new Date().getTime();

exports.findAll = (req, res,next) => {
    req.getConnection((err, connection)=>{
        if(err) return next(err)
    
    var sql = "SELECT * FROM course where (coursename like ? or course_id like ?)";
    var params ="%" + req.query.term+"%"
    connection.query(sql, [params, params], (err, results)=>{
        if (err) return next(err)
        res.send(results)
        })
    })
}

exports.findById = (req, res, next) =>{
    var id = parseInt(req.prams.id)
    req.getConnection((err, connection)=>{
        if(err) return next(err)
        connect.query("SELECT * FROM course where id=?",[id], (err, row)=>{
            if(err) return next(err)
            res.send(row[0])
        })
    })
}
exports.create = (req, res, next)=>{
    var  data = {
        course_name: req.course_name,
        course_log:req.remark,
        timestamp:timestamp,
    }   
    req.getConnection((err, connection)=>{
        if(err) return next(err)
        connect.query("INSERT INTO course set ?", data, (err,result)=>{
            if(err) return next(err)
            res.send(result)
        })
    })    
}
exports.update = (req, res, next) =>{
    var id =parseInt(req.params.id)
    var data = {
        course_name: req.course_name,
        course_log:req.remark,   
        timestamp:timestamp,
    }
    req.getConnection(function(err, connection){
        connection.query("SELECT * FROM course WHERE course_name=?",[post.course_name], function(err, results){
            if (err) return next(err)
            var isUpdate = false;
            if(results.length > 0){
                if(results[0].id !== id){
                    res.send({status:201, message:'ตรวจพบ หลักสูตรนี้ นในระบบ'})
                }else {
                    isUpdate = true;
                }
            }else{
               isUpdate = true;
            }
            if(isUpdate){ //ตรวจสอบ ว่าสามารถอัพเดทได้หรือไม่ แล้วทำการอัพเดท     
                connection.query("UPDATE course set ? where id=?", [data, id], function(err, results){
                        if(err) return next(err)
                        res.send(results)
                })
            }
        })
    })
}
exports.delete = (req, res, next)=>{
    var id = parseInt(req.params.id)
        req.getConnection(function(){
            connection.query("SELECT * FROMM course where id=?",[id], function(err, results){
                if(err) return next(err)
                if(results[0]){
                        res.send(results)
                }else{
                    res.send({status:201, message:'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'})
                }
            })
        })
}