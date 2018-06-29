
const moment = require('moment');
moment.locale('th');

exports.create  = (req,res,next)=>{
    var data =[];
    var i = 0;
    for(var key  in req.body.values){
       data[i] = key.split(',')
       data[i][1] = parseInt(data[i][1])
       data[i].push(parseInt(req.body.values[key]), req.body.per_id)
 
       i++;
    }
   
    req.getConnection(function (err, connection){
        if(err) return next(err);
        connection.query("INSERT INTO survey (title, id, value, per_id) values ?", [data],function(err, results){
            if(err) return next(err);
            res.send({
                 message:'ส่งแบบประเมิณเรียบร้อยแล้ว',
                 state:'done'
            })
        })
    })
}