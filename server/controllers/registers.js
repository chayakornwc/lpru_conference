var rn = require('random-number');
var sha256 = require('sha256');
var gen = rn.generator({
    min:  132115560
  , max:  999999999
  , integer: true
  })
    
    exports.create = (req, res, next) => {
    var { body } = req
    let id =   gen();
   // let password = sha256(req.password)
   // console.log(password);
    console.log(id)
    var post = {
    user_group:null,
    prefix: body.prefxtitle,
    first_name: body.first_name,
    last_name: body.last_name,
    company:body.affiliation,
    gender:body.gender,
    address: body.address,
    city:body.city,
    district:body.district,
    province:body.province,
    email: body.email,
    username:body.username,
    password:sha256(body.password)
    }
    console.log(post)
    req.getConnection(function (err, connection) {
    
       
    connection.query("insert into registration set ? ", post, (err, results) => {
    if (err) return next(err)
       console.log(results)
       res.send(results)
    })
    
    });
    
    }


    exports.findAll =(req, res,next) =>{
        connection.query("select username from registration where username=?", [post.username], function (err, results) {
            if (err) return next(err)
            if (results.length > 0) {
                res.send({ status: 201, message: 'Username is Duplicate' })
            } else {
                req.getConnection((err, connection)=>{
                    if(err) return next(err)
                })
                var sql = "select * from   where (firstname like ? or lasname like ?)";
                var params ="%" + req.query.term+"%"
                getConnection.query(sql, [params, params], (err, result)=>{
                    if (err) return next(err)
                    res.send(result)
                })
        }
    })
}