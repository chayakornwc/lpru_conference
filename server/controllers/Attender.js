
const config = require('../config')
const timestamp = new Date().toLocaleString();
const moment = require('moment');
moment.locale('th');

exports.findById = (req,res,next) => {
    var id = parseInt(req.params.id);
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        var sql = "SELECT r.username, r.prefix, r.first_name, r.last_name, gender, r.major, r.affiliation, r.company, course_order.order_id,  period.*, course.* FROM period LEFT JOIN course ON period.course_id = course.course_id"
        +" LEFT JOIN course_order ON course_order.course_id = course.course_id"
        +" LEFT JOIN registration r ON course_order.registration_id = r.id where period.per_id=?"; 
        connection.query(sql,[id],function(err, results){
        if(err) return next(err);
        res.send(results)
         
    })  
    
    })  
}
exports.create = (req, res, next) =>{
    var id = parseInt(req.params.id)
    var data ={
        per_id:req.body._id,
        time_stamp:timestamp
    }
}
exports.update = (req,res,next)=>{

}
exports.delete = (req,res,next)=>{
    
}