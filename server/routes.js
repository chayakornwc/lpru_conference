const passport = require('passport'); // มันสำคัญที่สุดนะ เลยต้องอยู่ข้างบน
const passportService = require('./service/passport');
const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

const registers = require('./controllers/registers');
const users = require('./controllers/Users');
const courses = require('./controllers/Courses');
const period = require('./controllers/Period');
const courseOrder = require('./controllers/CourseOrders');
const Examination = require('./controllers/Examination');
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

    app.get('/course', courses.findAll);
    app.get('/course/:id', courses.findById);
    app.post('/course', courses.create);
    
    app.put('/course/:id', courses.update);
    app.delete('/course/:id', courses.delete);

    app.get('/periods/', period.findAll);
    app.get('/period/:id', period.findById);
    app.post('/period/', period.create);

    app.put('/period/:id', period.update);
    app.delete('/period/:id', period.delete);

    app.get('/courseorder/', courseOrder.findAll);
    app.get('/courseorder/:id', courseOrder.findById)
    app.post('/courseorder/', courseOrder.create);

    app.put('/courseorder/:id',courseOrder.update);
    app.delete('/courseorder/:id', courseOrder.delete);
    
    app.get('/examination/:course_id/:exam_id', Examination.findById);
    app.post('/examination/:course_id', Examination.create);
}