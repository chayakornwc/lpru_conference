const config = require('../config');
const timestamp = new Date().toLocaleString();

exports.findAll = (req, res,next)=>{
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        var sql = "SELECT period.per_start, period.per_end, period.per_price, course.*, r.prefix, r.first_name, r.last_name, r.gender, r.major, r.affiliation, r.company, r.username FROM course_order"
                 +" LEFT JOIN period ON period.per_id = course_order.per_id" 
                 +" LEFT JOIN registration r ON course_order.registration_id = r.id" 
                 +" LEFT JOIN course ON period.course_id = course.course_id where course.course_id LIKE ? OR course_name LIKE ? ";
         var params = '%'+req.query.term+'%';       
         connection.query(sql, [params, params], (err, results)=>{
            if (err) return next(err);
            res.send(results);
        });
    })

}

exports.findById = (req, res, next)=>{
    req.getConnection((err, connection)=>{
       var id = parseInt(params.id); 
        if (err) return next(err);
        var params = '%'+req.query.term+'%';       
        var sql = "SELECT period.per_start, period.per_end, period.per_price, course.*, r.prefix, r.first_name, r.last_name, r.gender, r.major, r.affiliation, r.company, r.username FROM course_order"
                 +" LEFT JOIN period ON period.per_id = course_order.per_id" 
                 +" LEFT JOIN registration r ON course_order.registration_id = r.id" 
                 +" LEFT JOIN course ON period.course_id = course.course_id where id=? AND course.course_id LIKE ? OR course_name LIKE ? ";
        connection.query(sql, [id, params, params], (err, results)=>{
            if (err) return next(errr);
            res.send(results);
        })
    })
}

exports.create = (req, res, next)=>{
    var data =  {
       per_id:req.body.per_id,
       registration_id:req.body.registration_id,
       course_id:req.body.course_id,
       cert_id: null,
       time_stamp:timestamp
    };
    req.getConnection((err, connection)=>{
        if (err) return next(err);
        connection.query("INSERT INTO course_order set ?",data,(err, results)=>{
            if (err) return next(err); 
                res.send({status:200, message:'เพิ่มข้อมูลเรียบร้อยแล้ว'});     
        })
    })
}
exports.update = (req, res, next)=>{
    var id = parseInt(req.params.id)
    var data=  {
        per_id:req.body.per_id,
        registration_id:req.body.registration_id,
        course_id:req.body.course_id,
        cert_id: null,
        time_stamp:timestamp
    };
    req.getConnection((err, connection)=>{
        connection.query("UPDATE course_order SET ? WHERE order_id =? ",[data, id], (err, results)=>{
            if(err) return next(err);
            res.send({status:200, message:'แก้ไขข้อมูลเรียบร้อยแล้ว'});
        })
    })
}
exports.delete = (req, res, next)=>{
    var id = parseInt(req.params.id)
    req.getConnection((err, connection)=>{
        connection.query("DELETE FROM course_order where order_id =?",[id],(err, results)=>{
             if (err) return next(err);
             if(results.length>0){
                 res.send({status:200,message:'ลบข้อมูลเรียบร้อยแล้ว'});
             }else{
                 res.send({status:201, message:'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'});
             }
        });
    });
}
