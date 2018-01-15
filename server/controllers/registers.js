

var rn = require('random-number');

var gen = rn.generator({
    min:  132115560
  , max:  999999999
  , integer: true
  })
    
    exports.create = (req, res, next) => {
    var { body } = req
    let id =   gen();
    console.log(id)
    var post = {
    uid: id,
    title: body.prefxtitle,
    attend_type: body.attendas,
    firstname: body.first_name,
    lastname: body.last_name,
    affiliation:body.affiliation,
    address: body.city,
    province:body.province,
    postal:body.postal,
    region: body.country,
    email: body.email,
    presentation_type: body.pst_type,
    submission_type: body.submiss_type,
    payment_type: body.payment_type,
    payment_status: 'Waiting',
    price: body.price,
    created:null,
    status:'wait',
    path_std:body.filesname,
    path_mou:body.mou_document
    }

    req.getConnection(function (err, connection) {
    
  
    connection.query("insert into registration set ? ", post, (err, results) => {
    if (err) return next(err)
    res.send(post);
    })
    
    });
    
    }


    exports.findAll =(req, res,next) =>{
        req.getConnection((err, connection)=>{
            if(err) return next(err)
        })
        var sql = "select * from registration  where (firstname like ? or lasname like ?)";
        var params ="%" + req.query.term+"%"
        getConnection.query(sql, [params, params], (err, result)=>{
            if (err) return next(err)
            res.send(result)
        })
    }