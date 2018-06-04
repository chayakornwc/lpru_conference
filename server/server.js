const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const myConnection = require('express-myconnection')

const config = require('./config')
const routes = require('./routes')
const PORT = 3009;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: '*/*' }))

app.use(myConnection(mysql, config.dbOptions, 'pool'))
routes(app)

app.listen(PORT, () => {
    console.log('ready server on http://localhost:' + PORT +' Now use this database :'+config.dbOptions.database)
    
})

