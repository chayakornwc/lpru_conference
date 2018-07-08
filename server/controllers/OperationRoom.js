
const config = require('../config')


exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err);
        var sql = "SELECT room_id as id, room_name as name, room_code as code FROM operation_room WHERE room_name LIKE ?"; 
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
        var sql = "SELECT * FROM operation_room WHERE room_id=?";
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
exports.create = (req, res, next)=>{
    var data = {
        room_name:req.body.room_name,
        room_code:req.body.room_code
    }
    req.getConnection((err, connection)=>{
        if(err) return next(err)
        connection.query("SELECT * FROM operation_room WHERE room_name =?",[data.room_name], function(err, results){
            if(err) return next(err);
            if(results.length > 0){
                res.send({status:201, message:'ตรวจพบข้อมูลห้องปฏิบัติการนี้ในระบบ'})
            }else{
                connection.query("INSERT INTO operation_room SET ?",data, function(err, results){
                    if(err) return next (err);
                    res.send(results)
                })
            }
        })       
    })
}
exports.update = (req, res, next) =>{
    var id = parseInt(req.params.id)
    var data = {
        room_name:req.body.room_name,
        room_code:req.body.room_code
    }
    req.getConnection((err, connection)=>{
        connection.query("SELECT * FROM operation_room WHERE room_name = ? or room_code =?",[data.room_name, data.room_code],function(err,results){
            if(err) return next(err);
            var isUpdate = false;
            if(results.length > 0 ){
                if(results[0].room_id!==id){
                    res.send({status:201,message:'ตรวจพบข้อมูลห้องปฏิบัติการนี้ในระบบ'})
                }else{
                    isUpdate = true;
                }
            }else{
                isUpdate = true;
            }
            if(isUpdate){
                connection.query("UPDATE operation_room SET ? WHERE room_id = ?",[data, id], function(err, results){
                    if(err) return next(err)
                    res.send(results)
                })  
            }
        })
    })
}
exports.delete = (req, res, next) =>{
    var id = parseInt(req.params.id)
    req.getConnection(function(err, connection){
        if(err) return next(err)
        connection.query("DELETE FROM operation_room where room_id=?",[id], (err, results)=>{
            if(err) return next(err)
           res.send(results)
        })
    })
}
