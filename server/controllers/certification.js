const config = require('../config');


exports.findAll = (req,res)=>{
    req.getConnection((err, connection)=>{
        if(err)  throw err;
        connection.query("SELECT cert.cert_id, cert.iat, p.per_id, p.per_start, p.per_end, p.per_time_start, p.per_time_end, c.*, concat(r.prefix,' ',r.first_name,' ',r.last_name) as fullname FROM certification cert LEFT OUTER JOIN period p ON cert.per_id = p.per_id"
        +" LEFT OUTER JOIN course c ON c.course_id = p.course_id" 
        +" LEFT OUTER JOIN registration r ON cert.registration_id = r.id"
        +" GROUP BY cert.cert_id, cert.registration_id, cert.per_id"
        ,(err, results)=>{
            if(err) return next(err);
            res.send(results);
        })
    })
}
exports.findByPeriodsId =(req, res, next)=>{
        var id = parseInt(req.params.id)
        req.getConnection((err, connection)=>{
            if(err) throw err;
            connection.query("SELECT cert.cert_id, cert.iat, p.per_id, p.per_start, p.per_end, p.per_time_start, p.per_time_end, c.*, concat(r.prefix,' ',r.first_name,' ',r.last_name) as fullname, username FROM certification cert LEFT OUTER JOIN period p ON cert.per_id = p.per_id"
            +" LEFT OUTER JOIN course c ON c.course_id = p.course_id" 
            +" LEFT OUTER JOIN registration r ON cert.registration_id = r.id"
            +" WHERE cert.per_id = ? GROUP BY cert.cert_id, cert.registration_id, cert.per_id"
            ,[id], (err, results)=>{
                if(err) return next(err);
                res.send(results);
            })
        })
}
exports.findByOption = (req, res, next)=>{
    var option = `(${req.query.option})`;
    req.getConnection((err, connection)=>{
        if(err) throw err;
       connection.query("SELECT cert.cert_id, cert.iat, p.per_id, p.per_start, p.per_end, p.per_time_start, p.per_time_end, c.*, concat(r.prefix,' ',r.first_name,' ',r.last_name) as fullname, username FROM certification cert LEFT OUTER JOIN period p ON cert.per_id = p.per_id"
        +" LEFT OUTER JOIN course c ON c.course_id = p.course_id" 
        +" LEFT OUTER JOIN registration r ON cert.registration_id = r.id"
        +" WHERE cert.cert_id IN ("+req.query.option+") GROUP BY cert.cert_id, cert.registration_id, cert.per_id"
        , (err, results)=>{
            if(err) return next(err);
            res.send(results);
        })
        
    })

}   