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
var mailgun = require("mailgun-js");
var api_key = '9246f9f162f419a7c93a96b7860b51fa-0470a1f7-1f8f42c3';
var DOMAIN = 'sandbox5f1389d9ca3447a1ac6fa6022534be37.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
var CronJob = require('cron').CronJob;
var moment = require('moment');
moment.locale('th');
var job = new CronJob({
    cronTime: '2 * * * * *',
    onTick: function() {
        var connection = mysql.createConnection(config.dbOptions, 'pool');
        connection.connect();
         connection.query("SELECT p.*, c.course_name, concat(r.prefix,' ',r.first_name,' ',r.last_name) as fullname, r.email FROM period p LEFT OUTER JOIN course c ON p.course_id = c.course_id LEFT OUTER JOIN course_order co ON co.per_id = p.per_id  LEFT OUTER JOIN  registration r  ON r.id  = co.registration_id WHERE p.per_start = CURDATE()  +INTERVAL 1 DAY", function(err,results){
            if(err) throw err;
            var data = {
                from: 'Computer Center <notification@computercentre.lpru.ac.th>',
                to: '',
                subject: '',
                text: 'Testing some Mailgun awesomness!'
                };
           results.forEach(e =>{
              data.to = e.email
              data.subject = `แจ้งเจือนการเข้าร่วมการอบรม หลักสูตร ${e.course_name} วันที่ ${moment(e.per_end).add(543, 'years').format('ll')}`
              data.html = `<html xmlns="http://www.w3.org/1999/xhtml">
              <head>
              <meta name="viewport" content="width=device-width" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Alerts e.g. approaching your limit</title>
              <link href="styles.css" media="all" rel="stylesheet" type="text/css" />
              </head>
              
              <body itemscope itemtype="http://schema.org/EmailMessage">
              
              <table class="body-wrap">
                  <tr>
                      <td></td>
                      <td class="container" width="600">
                          <div class="content">
                              <table class="main" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td class="alert alert-warning">
                                          Warning: You're approaching your limit. Please upgrade.
                                      </td>
                                  </tr>
                                  <tr>
                                      <td class="content-wrap">
                                          <table width="100%" cellpadding="0" cellspacing="0">
                                              <tr>
                                                  <td class="content-block">
                                                      You have <strong>1 free report</strong> remaining.
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td class="content-block">
                                                      Add your credit card now to upgrade your account to a premium plan to ensure you don't miss out on any reports.
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td class="content-block">
                                                      <a href="http://www.mailgun.com" class="btn-primary">Upgrade my account</a>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td class="content-block">
                                                      Thanks for choosing Acme Inc.
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              <div class="footer">
                                  <table width="100%">
                                      <tr>
                                          <td class="aligncenter content-block"><a href="http://www.mailgun.com">Unsubscribe</a> from these alerts.</td>
                                      </tr>
                                  </table>
                              </div></div>
                      </td>
                      <td></td>
                  </tr>
              </table>
              
              </body>
              </html>`
              
           })
           console.log(data)
        })
     
    },
    start: false,
  });
  job.start();
// var data = {
//   from: 'Computer Center <notification@computercentre.lpru.ac.th>',
//   to: 'chayakorn.lpru@gmail.com',
//   subject: 'แจ้งเตือนการเข้าร่วมอบรม',
//   text: 'Testing some Mailgun awesomness!'
// };

// mailgun.messages().send(data, function (error, body) {
//   console.log(body);
// });


app.listen(PORT, () => {
    console.log('ready server on http://localhost:' + PORT +' Now use this database :'+config.dbOptions.database)
    
})

