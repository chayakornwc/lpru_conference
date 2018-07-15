const config = require('../config')
const timestamp = new Date().toLocaleString();
const moment = require('moment');
moment.locale('th');

exports.findById = (req,res,next) => {
    var id = parseInt(req.params.id);

    req.getConnection((err, connection)=>{
        if(err) return next(err);
        var sql = "SELECT r.id, r.username, concat(r.prefix,' ', r.first_name,' ', r.last_name)  as fullname, gender, r.major, r.affiliation, r.company, course_order.order_id,  period.*, course.* FROM course_order"
        +"  LEFT JOIN period ON course_order.per_id = period.per_id"
        +"  LEFT JOIN course ON period.course_id = course.course_id"
        +"  LEFT JOIN registration r ON course_order.registration_id = r.id WHERE period.per_id= ? ";
            connection.query(sql,[id],function(err, results){
            if(err) return next(err);
            res.send(results)
                })  
    })  
}
exports.create = (req, res, next) =>{
    var id = parseInt(req.params.id);
    var registration_id = parseInt(req.body.registration_id);
    var data = {
        per_id:id,
        registration_id:registration_id,
        time_stamp:timestamp
        }
    
        req.getConnection((err, connection)=>{
            if(err) throw err;
            connection.query("SELECT r.username FROM registration r LEFT JOIN course_order co ON r.id = co.registration_id WHERE r.id =? AND co.per_id =?",[registration_id, id], function (err, results){
                if(err) throw err;
                if(results.length >0){
                    res.send({status:201, message:'User is already exits in this period!'})
                }else{
                    connection.query("INSERT INTO course_order SET ?", [data], (err, results)=>{
                        if(err)  throw err
                        res.send({message:"เพิ่มข้อมูลเรียบร้อยแล้ว"});
                    })
                }    
            })
        })
    }


exports.delete = (req,res,next)=>{
    var id = parseInt(req.params.id);
        req.getConnection((err, connection)=>{
            if(err) throw err;
            connection.query("DELETE FROM course_order WHERE order_id = ?", id, (err, results)=>{
                if(err) throw err;
                res.send(results);
            })
        })
    }
