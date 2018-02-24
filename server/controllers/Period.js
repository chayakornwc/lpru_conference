import { connect } from 'http2';


const config = require('../config')
const timestamp = new Date().toLocaleString();

exports.findAll = (req, res, next) =>{
    req.getConnection((err, connection)=>{
        if (err) return next(err);
        var sql = "SELECT period.* course.* count(course_order.id) as period_quantity FROM period LEFT JOIN course ON period.course_id = course.course_id"
                                                                              +"INNER JOIN  course_order course_order. ON  course.course_id";                                                      
        res.send(sql);
    })
    
}
exports.findById = (req,res,next)=>{
    var id = parseInt(req.params.id);
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        connection.query("SELECT period.* course.* cont(course_order_id) as period_quantity FROM period LEFT JOIN course ON period.course_id =course.course_id"
                                                                                                        +"")  
     //   var sql = "SELECT period.* course.* FROM period where per_id=?"
    })  
}
exports.update = (req,res,next)=>{
    req.getConnection((err, connection)=>{
        if(err) return next(err);
    })
}
exports.create  = (req,res,next)=>{
    req.getConnection((err, connection)=>{
        if(err) return next(err)

    })
}