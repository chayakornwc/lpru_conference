const registers = require('./controllers/registers');

module.exports = function(app) {

    app.get('/', function(req, res){
        res.send({message: 'anres conference'})
    })

   app.post('/registers', registers.create) 
}