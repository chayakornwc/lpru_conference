const config = require('../config')
const timestamp = new Date().toLocaleString();
var moment = require('moment');
moment.locale('th');

exports.emailDaily=(req, res,next)=>{
        req.getConnection((err, connection)=>{
            connection.query("SELECT * FROM period WHERE per_start =  CURDATE()  +INTERVAL 1 DAY LEFT OUTER JOIN  ", function(err,results){
                res.send(results)
            })
        })
}