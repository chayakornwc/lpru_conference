const config = require('../config')
const timestamp = new Date().toLocaleString();
var moment = require('moment');
moment.locale('th');

exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err);
        var options = req.query.options ; 
        var Pasevents = req.query.Pastevents ? req.query.Pastevents  : false
        var Upcoming = req.query.Upcoming ? req.query.Upcoming : false ;
        var startDate = req.query.startDate ? moment(req.query.startDate, ['DD MMMM YYYY', moment.ISO_8601], 'th').add(-543,'years').format('YYYY-MM-DD') : '';
        var endDate = req.query.endDate ? moment(req.query.endDate,['DD MMMM YYYY',  moment.ISO_8601], 'th').add(-543,'years').format('YYYY-MM-DD') : '';  
        var whereOptions = '';
        var wherestr = '';
        if(options){
            whereOptions = ` AND period.per_status IN (${options})`
        }
        if(startDate){
            wherestr = ` AND period.per_start = '${startDate}' `
        }
        if(endDate){
            wherestr = ` AND period.per_end = '${endDate}' `
        }
        if(startDate && endDate){
            wherestr = `AND period.per_start = '${startDate}' AND period.per_end = '${endDate}' `
        }
        if(Upcoming) {
            wherestr += `AND period.per_start >= CURRENT_DATE()`
        }
        if(Pasevents){
            wherestr += `AND period.per_start < CURRENT_DATE()`
        }
        var sql = "SELECT period.*, course.*, operation_room.room_name, count(course_order.order_id) as period_quantity  FROM period LEFT JOIN course ON period.course_id = course.course_id"
                 +" LEFT JOIN  course_order ON  course_order.per_id = period.per_id"
                 +" LEFT JOIN operation_room ON period.room_id = operation_room.room_id"
                 +" WHERE (period.per_id LIKE ?  OR course.course_name LIKE ?  OR course.course_nameEng LIKE ?) "+whereOptions+wherestr+"  GROUP BY period.per_id  ORDER BY per_start DESC "; 
                 var params = "%"+req.query.term+"%";        
                  
        connection.query(sql,[params, params, params], function(err, results){ 
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
        +" LEFT JOIN course_order ON course_order.per_id = period.per_id WHERE period.per_id=?"; 
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
exports.findUpcoming = (req,res,next)=>{
        req.getConnection((err, connection)=>{
            if(err) throw (err);
            var sql ="SELECT period.*, course.*, operation_room.room_name, count(course_order.order_id) as period_quantity  FROM period LEFT JOIN course ON period.course_id = course.course_id"
            +" LEFT JOIN  course_order ON  course_order.per_id = period.per_id"
            +" LEFT JOIN operation_room ON period.room_id = operation_room.room_id"
            +" WHERE (period.per_id LIKE ?  OR course.course_name LIKE ?  OR course.course_nameEng LIKE ?) "+wherestr+"  GROUP BY period.per_id  ORDER BY period.per_id DESC "
            
        })
}
exports.update = (req,res,next) => {
   
    var _perstart = moment(req.body.per_start, ['DD MMMM YYYY', 'YYYY-MM-DD']).add(-543, 'years').format();
    var _perEnd = moment(req.body.per_end, ['DD MMMM YYYY', 'YYYY-MM-DD']).add(-543, 'years').format();
    var TimeStart = moment(req.body.per_time_end).isValid() ? moment(req.body.per_time_start,'HH:mm').format('LT') : req.body.per_time_start
    var TimeEnd = moment(req.body.per_time_end).isValid() ? moment(req.body.per_time_end,'HH:mm').format('LT') : req.body.per_time_end
    var data ={
        per_start:_perstart,
        per_end:_perEnd,
        per_time_start:TimeStart,
        per_time_end:TimeEnd,
        per_status:req.body.per_status,
        per_price:req.body.per_price,
        per_quota:req.body.per_quota,
        course_id:req.body.course_id,
        room_id:req.body.room_id,
        lecture:req.body.lecture
        
    }
    req.getConnection((err, connection) => {
        var id = parseInt(req.params.id);
        if(err)  throw err;
        connection.query("UPDATE  period SET ? where per_id =?",[data, id],  function(err, results){
            if(err) throw (err);
                res.send(results);
        })
    })
}
exports.create  = (req,res,next) => {
 
    var _perstart = moment(req.body.per_start, ['DD MMMM YYYY, YYYY-MM-DD']).add(-543, 'years').format();
    var _perEnd = moment(req.body.per_end, ['DD MMMM YYYY, YYYY-MM-DD']).add(-543, 'years').format();
    var TimeStart = moment(req.body.per_time_start).format('LT');
    var TimeEnd = moment(req.body.per_time_end).format('LT');
    
    var data ={
        per_start:_perstart,
        per_end:_perEnd,
        per_time_start:TimeStart,
        per_time_end:TimeEnd,
        per_price:req.body.per_price,
        per_quota:req.body.per_quota,
        course_id:req.body.course_id,
        room_id:req.body.room_id,
        lecture:req.body.lecture,
    }
    req.getConnection((err, connection)=>{
        if(err)  throw err;
        isInsert = false
        connection.query(`SELECT * FROM period WHERE per_start BETWEEN ? AND ? OR per_end BETWEEN ? AND ? AND lecture LIKE ? `,[data.per_start, data.per_end, data.per_start, data.per_end, `%${data.lecture}%`], (err, results)=>{
            if(err) throw err;
            if(results.length >0){
                res.status(500).send({message:`วิทยากร ${lecture} ได้มีการลงทะเบียนการอบรมแล้ว`})
            }else{
                isInsert = true
            }
            if(isInsert){
                connection.query(`INSERT INTO period SET ?`, [data],function(err, response){
                    if(err) throw err;
                        res.send({response})
                })
            }
            
        })
    })
}
    
exports.delete  = (req,res,next) => {
    var id = parseInt(req.params.id);
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