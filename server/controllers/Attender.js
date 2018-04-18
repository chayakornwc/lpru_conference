const config = require('../config')
const timestamp = new Date().toLocaleString();
const moment = require('moment');
moment.locale('th');

exports.findById = (req,res,next) => {
    var id = parseInt(req.params.id);
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        var sql = "SELECT r.prefix, r.firstname, r.last_name, gender, r.major, r.affiliation, r.company, r.username, period.*, course.* FROM period LEFT JOIN course ON period.course_id = course.course_id"
        +" LEFT JOIN course_order ON course_order.course_id = course.course_id where period.per_id=?"; 
        console.log(sql);
    //     connection.query(sql,[id],function(err, results){
    //     if(err) return next(err);
    //     res.send(results[0])
         
    // })  
    // SELECT r.prefix, r.first_name, r.last_name, gender, r.major, r.affiliation, r.company, r.username, period.*, course.* FROM period LEFT JOIN course ON period.course_id = course.course_id LEFT JOIN course_order ON course_order.course_id = course.course_id LEFT JOIN registration r ON course_order.registration_id = r.id where period.per_id=15
    })  
}