const config = require('../config');


exports.findAll = (req,res,next)=>{
    var course_id = parseInt(req.params.course_id);
    var exam_id = parseInt(req.params.exam_id);
    
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        connection.query("SELECT cert.cert_id, cert.iat, p.per_id, p.per_start, p.per_end, p.per_time_start, p.per_time_end, c.*, (r.prefix+' '+r.first_name+' '+r.last_name) as fullname FROM certification cert LEFT OUTER JOIN period p ON cert.per_id = p.per_id"
        +" LEFT OUTER JOIN course c ON c.course_id = p.course_id" 
        +" LEFT OUTER JOIN registration r ON cert.registration_id = r.id"
        +" GROUP BY cert.cert_id, cert.registration_id, cert.per_id"
        ,[course_id, exam_id], (err, results)=>{
            if(err) return next(err);
            res.send(results);
        })
    })
}

