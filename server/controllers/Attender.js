import { connect } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-redux';


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
    var data = {
        per_id:id,
        registration_id:req.body.registration_id,
        time_stamp:timestamp
        }
        req.getConnection((err, connection)=>{
            if(err)return next(err);

            connection.query("SELECT course_order LEFT JOIN registration ON course_order.registration_id = registration.id    where registraion.id = ? AND course_order.per_id"[data.registration_id, id], function (err, results){
                if(err)return next(err);
                if(results.length >0){
                    res.send({status:201, message:'User is already exits in this period!'})
                }else{
                    connection.query("INSERT INTO course_order SET ? ", data, (err, results)=>{
                        if(err) return next(err);
                        res.send(results);
                    })
                }    
            })
        })
    }
exports.update = (req,res,next)=>{
    
    }
exports.delete = (req,res,next)=>{
    
    }
