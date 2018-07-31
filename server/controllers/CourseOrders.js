const config = require('../config');
const timestamp = new Date().toLocaleString();
const moment = require('moment');
moment.locale('th');
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
exports.findAllByCompletePeriod = (req, res, next)=>{
    req.getConnection((err,connection)=>{
        if(err) throw err;
        var startDate = req.query.start ? moment(req.query.start, ['DD MMMM YYYY', moment.ISO_8601], 'th').add(-543,'years').format('YYYY-MM-DD') : '';
        var endDate = req.query.end ? moment(req.query.end,['DD MMMM YYYY',  moment.ISO_8601], 'th').add(-543,'years').format('YYYY-MM-DD') : '';  
        var affiliation = req.query.affiliation ? req.query.affiliation :''
        var course = req.query.course ? req.query.course : ''
        var wherestr = ``;
        if(affiliation){
            wherestr = `AND r.affiliation = ${affiliation}`
        }
        if(course){
            wherestr = `AND c.course_id = ${course}`
        }
        if(affiliation && course){
            wherestr = `AND r.affiliation = ${affiliation} AND c.course_id = ${course}`
        }
        if(startDate && endDate){
            wherestr = `AND p.per_end  BETWEEN '${startDate}' AND '${endDate}' `
        }
        if(startDate && endDate && course){
            wherestr = `AND p.per_end  BETWEEN '${startDate}' AND '${endDate}'  AND c.course_id =${course}`
        }
        if(startDate && endDate && affiliation){
            wherestr = `AND p.per_end  BETWEEN '${startDate}' AND '${endDate}'  AND r.affiliation = ${affiliation}`
        }
        if(startDate && endDate && affiliation && course){
            wherestr = `AND p.per_end  BETWEEN '${startDate}' AND '${endDate}'  AND r.affiliation = ${affiliation} AND c.course_id = ${course}`
        }
        
        
        var sql=`SELECT p.*, r.id, r.username, CONCAT(r.prefix,' ',r.first_name,' ',r.last_name)as fullname, r.affiliation, r.major,c.course_name FROM course_order co LEFT OUTER JOIN  period p ON co.per_id = p.per_id
         LEFT OUTER JOIN course c ON c.course_id = p.course_id
        LEFT OUTER JOIN  registration r on co.registration_id = r.id
        WHERE p.per_status = 3 ${wherestr} ORDER BY p.per_id DESC, p.per_end`
        connection.query(sql,function(err, results){
            if(err) {
                res.status(400)
                res.send(sql)
                throw err;
                
            }
            res.send(results)
        })
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
exports.findByuserId = (req, res,next)=>{
    req.getConnection((err, connection)=>{
        if(err) throw err;
        var id = parseInt(req.params.id);
        var sql = "SELECT co.*, p.*, c.course_name, c.course_nameEng FROM course_order co" 
        +" INNER JOIN period p ON p.per_id = co.per_id" 
        +" LEFT OUTER JOIN  course c ON c.course_id = p.course_id WHERE co.registration_id = ? ORDER BY p.per_id DESC" 
        connection.query(sql, [id], (err,results)=>{
            if(err) throw err; 
               connection.query("SELECT sum(score) as totalScore, per_id FROM (SELECT CE.exam_id as exam_id, CE.course_id, CE.answer_real, AE.answer, AE.per_id as per_id, (CASE WHEN CE.answer_real = AE.answer THEN 1 ELSE 0 END)as score FROM course_exam CE LEFT OUTER JOIN afterExamination AE ON AE.course_id = CE.course_id WHERE AE.registration_id = ? GROUP BY AE.exam_id, per_id ) as dekg GROUP BY per_id ORDER BY per_id DESC",[id],function(err, results1){
                if(err) throw(err);
                   connection.query("SELECT count(exam_id) as maximumScore, per_id FROM (SELECT CE.exam_id as exam_id, AE.per_id as per_id FROM course_exam CE LEFT OUTER JOIN afterExamination AE ON AE.course_id = CE.course_id WHERE AE.registration_id = ? GROUP BY CE.exam_id, per_id ) as dekg GROUP BY per_id ORDER BY per_id DESC",[id], function(err,results2){
                    if(err) throw(err);
                    for(i=0;  i<results1.length; i++){
                        for(_i=0; _i<results2.length; _i++){
                                if(results1[i].per_id == results2[_i].per_id){
                                    results1[i].maximumScore = results2[_i].maximumScore;
                                }
                        }
                    }
                    var response = results; 
                    for(i=0; i<response.length; i++){
                        response[i].certification = 'none'
                        for(_i=0; _i<results1.length; _i++){
                               if(response[i].per_id == results1[_i].per_id && results1[_i].totalScore >=(results1[_i].maximumScore * 0.8)){
                                response[i].certification = 'passed'
                               }else if(response[i].per_id == results1[_i].per_id ){
                                response[i].certification = 'failed'
                               }
                               
                        }
                    }
                    res.send(response);   
                   })
                })         
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
