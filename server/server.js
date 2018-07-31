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
var api_key = 'key-e0a513f1a177c9f94a246200ee900cac';
var DOMAIN = 'bamboo.in.th';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
var CronJob = require('cron').CronJob;
var moment = require('moment');
moment.locale('th');

 /*
   * Runs every day
   * at 00:00:00 
   * Range Left to right
    Seconds: 0-59
    Minutes: 0-59
    Hours: 0-23
    Day of Month: 1-31
    Months: 0-11
    Day of Week: 0-6
   * 
   */
var job = new CronJob({
    cronTime: '05 * * * * *',
    onTick: function() {
      console.log('onTick')
        var connection = mysql.createConnection(config.dbOptions, 'pool');
        connection.connect();
         connection.query("SELECT p.*, c.course_name, concat(r.first_name,' ',r.last_name) as fullname, r.email, operation_room.room_name FROM period p LEFT OUTER JOIN course c ON p.course_id = c.course_id LEFT OUTER JOIN course_order co ON co.per_id = p.per_id  LEFT OUTER JOIN  registration r  ON r.id  = co.registration_id LEFT OUTER JOIN operation_room ON p.room_id = operation_room.room_id WHERE p.per_start = CURDATE()  +INTERVAL 1 DAY", function(err,results){
            if(err) throw err;
            var data = {
                from: 'Computer Center <notification@computercentre.lpru.ac.th>',
                to: '',
                subject: '',
                };
           results.forEach(e =>{
              data.to = `${e.email}`
              data.subject = `แจ้งเตือนการอบ หลักสูตร ${e.course_name} วันที่ ${moment(e.start).add(543, 'years').format('ll')} ถึง ${moment(e.start).add(543, 'years').format('ll')}`
              data.html = `<!doctype html>
              <html>
              <head>
              <meta name="viewport" content="width=device-width">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title>Branded transaction email example</title>
              <style media="all" type="text/css">
              @media only screen and (max-width: 620px) {
                table[class=body] h1,
                table[class=body] h2,
                table[class=body] h3,
                table[class=body] h4 {
                  font-weight: 600 !important;
                }
                table[class=body] h1 {
                  font-size: 22px !important;
                }
                table[class=body] h2 {
                  font-size: 18px !important;
                }
                table[class=body] h3 {
                  font-size: 16px !important;
                }
                table[class=body] .content,
                table[class=body] .wrapper {
                  padding: 10px !important;
                }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important;
                }
                table[class=body] .btn table,
                table[class=body] .btn a {
                  width: 100% !important;
                }
              }
              </style>
              </head>
              
              <body style="margin: 0; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100% !important; line-height: 1.6em; -webkit-font-smoothing: antialiased; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100% !important; background-color: #f6f6f6;">
              
              <table class="body" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;" width="100%" bgcolor="#f6f6f6">
                  <tr>
                      <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
                      <td class="container" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px;" width="580" valign="top">
                          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">.</span>
              <div class="header" style="box-sizing: border-box; margin-bottom: 30px; margin-top: 20px; width: 100%;">
                <table style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                  <tr>
                    <td class="align-center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                      <a href="http://comcentre.ac.th" style="box-sizing: border-box; color: #348eda; text-decoration: underline;"><img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Lpru.gif" height="200" alt="Comcentre" style="-ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                    </td>
                  </tr>
                </table>
              </div>
              <table class="main" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border: 1px solid #e9e9e9; border-radius: 3px;" width="100%">
                <tr>
                  <td class="wrapper" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; padding: 30px;" valign="top">
                    <table style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                      <tr>
                        <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                          <p style="font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">เรียน คุณ${e.fullname}</p>
                          <span>เชิญเข้าการร่วมอบรม หัวข้อ ${e.course_name}</span><br>
                          <span>วันที่ ${moment(e.start).add(543, 'years').format('ll')} ถึง  ${moment(e.start).add(543, 'years').format('ll')} ตั้งแต่เวลา ${moment(e.per_time_start, ['HH:mm:ss', 'HH:mm:ss']).format('HH:mm')} ถึง ${moment(e.per_time_end, ['HH:mm:ss', 'HH:mm:ss']).format('HH:mm')}</span><br>
                          <span>ณ ${e.room_name} ศูนย์คอมพิวเตอร์ มหาวิทยาลัยราชภัฏลำปาง</span>
                          <br>
                          <br>
                          <span>ด้วยความเคารพ</span>
                          <br>
                          <span>สำนักวิทยบริการและเทคโนโลยีมหาวิทยาลัยราชภัฏลำปาง</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div class="footer" style="box-sizing: border-box; clear: both; width: 100%;">
                <table style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; color: #999999; font-size: 12px;" width="100%">
                  <tr style="color: #999999; font-size: 12px;">
                    <td class="align-center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; vertical-align: top; font-size: 12px; color: #999999; text-align: center; padding: 20px 0;" valign="top" align="center">
                      <p style="font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; color: #999999; font-size: 12px;"><a href="http://comcentre.lpru.ac.th" style="box-sizing: border-box; text-decoration: underline; color: #999999; font-size: 12px;"> &copy; Lampang Rajabhat University</a> อีเมลฉบับนี้เป็นอีเมลอัตโนมัติกรุณาอย่าตอบกลับ</p>
                    </td>
                  </tr>
                </table>
              </div>
              </div>
                      </td>
                      <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
                  </tr>
              </table>
              
              </body>
              </html>
              `
              mailgun.messages().send(data, function (error, body) {
                });
           })
           
          
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
    console.log('ready server on http://localhost:' + PORT +' Now use this database :'+config.dbOptions.database+' Now is locale time '+moment().format())
    
})

