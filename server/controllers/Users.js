const jwt = require('jwt-simple')
const config = require('../config')
var sha256 = require('sha256');

function tokenForUser(user) {
const timestamp = new Date().getTime();
return jwt.encode(
{
    sub: user.id,
    user_group: user.user_group,
    name: user.name,
    username: user.username,
    iat: timestamp
},
config.secret
)
}
exports.signin = (req, res, next) => {
res.send({ token: tokenForUser(req.user) })
}

exports.findAll = (req, res,next) => {
    req.getConnection((err, connection)=>{
        if(err) return next(err)
    
    var sql = "select * from registration where (first_name like ? or username like ?)";
    var params ="%" + req.query.term+"%"
    
    connection.query(sql, [params, params], (err, results)=>{
        if (err) return next(err)
        res.send(results)
        
        })
    })
}
exports.findByTerm = (req, res, next)=>{
    var params = ""
    if(req.query.term !==''){
         params = "%" +req.query.term + "%";
    }
    var sql ="SELECT id, prefix, first_name, last_name, gender, major, affiliation, company, username FROM registration WHERE username LIKE ? OR first_name LIKE ? OR last_name LIKE  ? OR first_name+' '+last_name LIKE ? LIMIT 5 ";
    req.getConnection((err,connection)=>{
        connection.query(sql, [params, params, params, params], function(err, results){
            if(err) return next(err);
            res.send(results)
        })
    })
}
// exports.findAll = (req, res, next) => {
//     req.getConnection((err, connection) => {
//         if (err) return next(err)
//         var sql = "select * from registration where (first_name like ? or username like ?)";
//         var params = "%" + req.query.term + "%"
//         connection.query(sql, [params, params], (err, results) => {
//             if (err) return next(err)
//             res.send(results);
//         })
//     })
//}


exports.findById = (req, res, next)=>{
   
    var id = parseInt(req.params.id)
    req.getConnection((err, connection)=>{
        connection.query("select * from registration where id=?",[id], (err, row)=>{
            if (err) return next(err)
            res.send(row[0])
        })
    })
}    
exports.findPublicId=(res,res,next)=>{
    var id =parseInt(req.params.id)
    req.getConnection((err, connection)=>{
            connection.query("SELECT id, username, major,  concat(prefix,' ',first_name,' ',last_name) as fullname FROM registration WHERE=?", [id], (err, response)=>{
                if(err) return next(err)
                res.send(response[0])
            })
    })
}

exports.create = (req, res, next) => {
    var { body } = req
    var post = {
            user_group: body.user_group,   
            prefix: body.prefix,
            first_name: body.first_name,
            last_name: body.last_name,
            major:body.major,
            affiliation:body.affiliation,
            company:body.company,
            gender:body.gender,
            address: body.address,
            city:body.city,
            district:body.district,
            province:body.province,
            email: body.email,
            username:body.username,
            password:sha256(body.password)
        }
        req.getConnection(function (err, connection) {
            connection.query("SELECT username FROM registration where username=?", [post.username], function (err, results) {
                if (err) return next(err)
                if (results.length > 0) {
                        res.send({ status: 201, message: 'Username is Duplicate' })
                        } else  {
                                connection.query("insert into registration set ? ", post, (err, results) => {
                                if (err) return next(err)
                                res.send(results)
                        })
                }
            });
        });
    }

exports.update = (req, res, next) =>{
    var id =parseInt(req.params.id)
    var {body} = req
    var data = {
        user_group: parseInt(body.user_group),   
        prefix: body.prefix,
        first_name: body.first_name,
        last_name: body.last_name,
        major:body.major,
        affiliation:body.affiliation,
        company:body.company,
        gender:body.gender,
        address: body.address,
        city:body.city,
        district:body.district,
        province:body.province,
        email: body.email,
        username:body.username,
        password:sha256(body.password)
    }
    req.getConnection(function(err, connection){
        connection.query("SELECT * FROM registration WHERE username=?",[data.username], function(err, results){
            if (err) return next(err)
            var isUpdate = false;
            if(results.length > 0){
                if(results[0].id !== id){
                    res.send({status:201, message:'ตรวจพบ username นี้ในระบบ'})
                }else {
                    isUpdate = true;
                }
            }else{
               isUpdate = true;
            }
            if(isUpdate){ //ตรวจสอบ ว่าสามารถอัพเดทได้หรือไม่ แล้วทำการอัพเดท     
                connection.query("UPDATE registration set ? where id=?", [data, id], function(err, results){
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
        connection.query("DELETE FROM registration where id=?",[id], (err, results)=>{
            if(err) return next(err)
           res.send(results)
        })
    })
}
