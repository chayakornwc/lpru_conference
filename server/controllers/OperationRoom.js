const config = require('../config')


exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err);
        var sql = "SELECT room_id as id, room_name as name FROM operation_room WHERE room_name LIKE ?"; 
        var params = "%"+req.query.term+"%";
                                                           
        connection.query(sql,[params], function(err, results){ 
             if (err) return next(err);
             res.send(results);
        }) 
    })
    
    
}
exports.findById = (req,res,next) => {
    var id = parseInt(req.params.id);
    req.getConnection((err, connection)=>{
        if(err) return next(err);
        var sql = "SELECT * FROM operation_room WHERE id=?";
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
