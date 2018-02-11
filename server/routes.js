const passport = require('passport'); // มันสำคัญที่สุดนะ เลยต้องอยู่ข้างบน
const passportService = require('./service/passport');
const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const registers = require('./controllers/registers');
const users = require('./controllers/Users');


module.exports = function(app) {

    app.get('/', function(req, res){
        res.send({message: 'lpru conference api'})
    })
     app.post('/signin',requireSignin, users.signin)
     app.get('/users',requireAuth,  users.findAll)


     app.post('/registers', registers.create) 

    app.post('/users', requireAuth, users.create)
    app.get('/users/:id', requireAuth, users.findById)
    
    app.put('/users/:id', requireAuth, users.update)
    app.delete('/users/:id', requireAuth, users.delete)
}