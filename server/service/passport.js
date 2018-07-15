    const passport = require('passport');
    const LocalStrategy = require('passport-local');

    const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
    const config = require('../config');

    const sha256 = require('sha256');
    const localOptions = { passReqToCallback: true }
    
const localLogin = new LocalStrategy(localOptions, function (req, username, password, done) {
    req.getConnection((err, connection) => {
        
            if (err) throw (err) 
            connection.query("SELECT r.*, ut.* FROM registration r LEFT JOIN userTypes ut ON r.user_group = ut.user_group  WHERE username=?", [username], (err, row) => {
                if (err) return done(err)
                if (!row.length) return done('ไม่พบชื่อผู้ใช้นี้ภายในระบบ', false)
                if (row[0].password !== sha256(password)) {
                    return done('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', false)
                    } else {
                        return done(null, row[0])
                        }
                })
            })
    })

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: config.secret,
        passReqToCallback: true
     };
 const jwtRoute = new JwtStrategy(jwtOptions, function (req, payload, done) {
               req.getConnection((err, connection) => {
        if (err) return next(err)
                connection.query("select r.*, ut.* from registration r LEFT JOIN userTypes ut ON r.user_group = ut.user_group WHERE id=?", [payload.sub], (err, row) => {
                if (err) return done(err)
                    if (!row.length) return done(null, false);
                        return done(null, row[0])
                            })
                         })
                    })

passport.use(localLogin)
passport.use(jwtRoute)                  