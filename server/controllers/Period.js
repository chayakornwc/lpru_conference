const config = require('../config')
const timestamp = new Date().toLocaleString();

exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err);
        var sql = "SELECT period.*, course.*, count(course_order.order_id) as period_quantity FROM period LEFT JOIN course ON period.course_id = course.course_id"
                 +" INNER JOIN  course_order ON  course_order.course_id = course.course_id"
                 +" WHERE (period.per_id LIKE ? OR (period.per_start =? AND period.per_end =?) OR course.course_name =?  OR course.course_nameEng =?) "; 
        var params = "%"+req.query.term+"%";
                                                           
        connection.query(sql,[params, req.query.startdate, req.query.expdate, params, params], function(err, results){ 
             if (err) return next(err);
             res.send(results);
        }) 
    })
    
    
}
exports.findById = (req,res,next) => {
    var id = parseInt(req.params.id);
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        var sql = "SELECT period.*, course.*, count(course_order.order_id) as period_quantity FROM period LEFT JOIN course ON period.course_id = course.course_id"
        +" INNER JOIN course_order ON course_order.course_id = course.course_id where period.per_id=?";
        connection.query(sql,[id],function(err, results){
        if(err) return next(err);
            if(results[0]){
                res.send(results[0])
            }else{
                res.send({stats:201, message:'เกิดข้อผิดพลาดกรุณาลองอีกครั้ง'})
            }
    })  
   
    })  
}
exports.update = (req,res,next) => {
    var data = {
        per_start:req.body.per_start,
        per_end:req.body.per_end,
        per_price:req.body.per_price,
        per_quoata:req.body.per_quota,
        course_id:req.body.course_id,
        room_id:req.body.room_id
    }
    req.getConnection((err, connection) => {
        var id = parseInt(req.params.id);
        if(err) return next(err);
        connection.query("UPDATE  period SET ? where period_id =?",[data, id],  function(err, results){
            if(err) return next(err);
            if(results[0]){
                res.send(results);
            }else{
                res.send({status:201, message:'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'})
            }
        })
    })
}
exports.create  = (req,res,next) => {
    var data ={
        per_start:req.body.per_start,
        per_end:req.body.per_end,
        per_price:req.body.per_price,
        per_quoata:req.body.per_quota,
        course_id:req.body.course_id,
        room_id:req.body.room_id
    }
    req.getConnection((err, connection)=>{
        if(err) return next(err)
        connection.query("INSERT INTO period set ?",data, (err, results)=>{
            if(err) return next(err);
            res.send(results);
        })
<<<<<<< HEAD
=======

>>>>>>> 05d2531fa7e14a09ae79ef45efb9561615ebe72f
    })
}
exports.delete  = (req,res,next) => {
    req.getConnection((err, connection)=>{
        if(err) return next (err);
        connection.query("DELETE FROM period where per_id =?",[id], (err, results)=>{
            if(err) return next(err);
            if(results){
                res.send({status:200, message:'ลบข้อมูลเรียบร้อยแล้ว'});
            }else{
                res.send({status:201, message:'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'});
            }
        }); 
    });
}