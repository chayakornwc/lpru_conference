const config = require('../config')
const timestamp = new Date().toLocaleString();
const moment = require('moment');
moment.locale('th');

exports.attendYears = (req,res,next) => {
    var year = req.params.year ? parseInt(req.params.year - 543) : moment.year();
    
        var option =``
            if(year){
                option = `YEAR(p.per_end) = ${year} AND`
            }
    req.getConnection((err, connection)=>{
        if(err) throw err;
       var sql = `
       SELECT itech.*, sci.sci, edu.edu, human.human, manage.manage, arc.arc, other.other
       FROM (
       SELECT 1 AS MONTH, COUNT(itech.order_id) as itech FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1007) as itech 
       UNION 
       SELECT 2 AS MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1007) as itech
       UNION 
       SELECT 3 AS MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1007) as itech
       UNION 
       SELECT 4 AS MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1007) as itech
       UNION 
       SELECT 5 AS MONTH, COUNT(itech.order_id) as itech FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1007) as itech
       UNION SELECT 6 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1007) as itech
       UNION SELECT 7 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1007) as itech
       UNION SELECT 8 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1007) as itech
       UNION SELECT 9 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1007) as itech
       UNION SELECT 10 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1007) as itech
       UNION SELECT 11 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1007) as itech
       UNION SELECT 12 AS
       MONTH, COUNT(itech.order_id) as itech FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1007) as itech
      
       ) AS itech LEFT OUTER JOIN 
       (SELECT 1 AS MONTH, COUNT(sci.order_id) as sci FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1004) as sci 
       UNION 
       SELECT 2 AS MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1004) as sci
       UNION 
       SELECT 3 AS MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1004) as sci
       UNION 
       SELECT 4 AS MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1004) as sci
       UNION 
       SELECT 5 AS MONTH, COUNT(sci.order_id) as sci FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1004) as sci
       UNION SELECT 6 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1004) as sci
       UNION SELECT 7 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1004) as sci
       UNION SELECT 8 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1004) as sci
       UNION SELECT 9 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1004) as sci
       UNION SELECT 10 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1004) as sci
       UNION SELECT 11 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1004) as sci
       UNION SELECT 12 AS
       MONTH, COUNT(sci.order_id) as sci FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1004) as sci
       ) as sci ON itech.month = sci.month
       LEFT OUTER JOIN 
       (SELECT 1 AS MONTH, COUNT(edu.order_id) as edu FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1002) as edu 
       UNION 
       SELECT 2 AS MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1002) as edu
       UNION 
       SELECT 3 AS MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1002) as edu
       UNION 
       SELECT 4 AS MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1002) as edu
       UNION 
       SELECT 5 AS MONTH, COUNT(edu.order_id) as edu FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1002) as edu
       UNION SELECT 6 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1002) as edu
       UNION SELECT 7 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1002) as edu
       UNION SELECT 8 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1002) as edu
       UNION SELECT 9 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1002) as edu
       UNION SELECT 10 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1002) as edu
       UNION SELECT 11 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1002) as edu
       UNION SELECT 12 AS
       MONTH, COUNT(edu.order_id) as edu FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1002) as edu
       ) as edu ON sci.month = edu.month LEFT OUTER JOIN
       (SELECT 1 AS MONTH, COUNT(human.order_id) as human FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1003) as human 
       UNION 
       SELECT 2 AS MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1003) as human
       UNION 
       SELECT 3 AS MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1003) as human
       UNION 
       SELECT 4 AS MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1003) as human
       UNION 
       SELECT 5 AS MONTH, COUNT(human.order_id) as human FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1003) as human
       UNION SELECT 6 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1003) as human
       UNION SELECT 7 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1003) as human
       UNION SELECT 8 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1003) as human
       UNION SELECT 9 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1003) as human
       UNION SELECT 10 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1003) as human
       UNION SELECT 11 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1003) as human
       UNION SELECT 12 AS
       MONTH, COUNT(human.order_id) as human FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1003) as human
       ) as human ON edu.month = human.month LEFT OUTER JOIN 
       (SELECT 1 AS MONTH, COUNT(manage.order_id) as manage FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1005) as manage 
       UNION 
       SELECT 2 AS MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1005) as manage
       UNION 
       SELECT 3 AS MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1005) as manage
       UNION 
       SELECT 4 AS MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1005) as manage
       UNION 
       SELECT 5 AS MONTH, COUNT(manage.order_id) as manage FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1005) as manage
       UNION SELECT 6 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1005) as manage
       UNION SELECT 7 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1005) as manage
       UNION SELECT 8 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1005) as manage
       UNION SELECT 9 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1005) as manage
       UNION SELECT 10 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1005) as manage
       UNION SELECT 11 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1005) as manage
       UNION SELECT 12 AS
       MONTH, COUNT(manage.order_id) as manage FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1005) as manage
       ) as manage ON edu.month = manage.month LEFT JOIN
       (SELECT 1 AS MONTH, COUNT(arc.order_id) as arc FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1006) as arc 
       UNION 
       SELECT 2 AS MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1006) as arc
       UNION 
       SELECT 3 AS MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1006) as arc
       UNION 
       SELECT 4 AS MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1006) as arc
       UNION 
       SELECT 5 AS MONTH, COUNT(arc.order_id) as arc FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1006) as arc
       UNION SELECT 6 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1006) as arc
       UNION SELECT 7 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1006) as arc
       UNION SELECT 8 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1006) as arc
       UNION SELECT 9 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1006) as arc
       UNION SELECT 10 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1006) as arc
       UNION SELECT 11 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1006) as arc
       UNION SELECT 12 AS
       MONTH, COUNT(arc.order_id) as arc FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1006) as arc
       ) as arc ON manage.month = arc.month LEFT OUTER JOIN
       (SELECT 1 AS MONTH, COUNT(other.order_id) as other FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 1 AND r.affiliation = 1006) as other 
       UNION 
       SELECT 2 AS MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 2 AND r.affiliation = 1006) as other
       UNION 
       SELECT 3 AS MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 3 AND r.affiliation = 1006) as other
       UNION 
       SELECT 4 AS MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 4 AND r.affiliation = 1006) as other
       UNION 
       SELECT 5 AS MONTH, COUNT(other.order_id) as other FROM
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 5 AND r.affiliation = 1006) as other
       UNION SELECT 6 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 6 AND r.affiliation = 1006) as other
       UNION SELECT 7 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 7 AND r.affiliation = 1006) as other
       UNION SELECT 8 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 8 AND r.affiliation = 1006) as other
       UNION SELECT 9 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 9 AND r.affiliation = 1006) as other
       UNION SELECT 10 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 10 AND r.affiliation = 1006) as other
       UNION SELECT 11 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 11 AND r.affiliation = 1006) as other
       UNION SELECT 12 AS
       MONTH, COUNT(other.order_id) as other FROM 
       (SELECT co.order_id, MONTH(p.per_end) AS month_end  FROM period p LEFT OUTER JOIN course_order co ON p.per_id = co.per_id LEFT OUTER JOIN registration r ON co.registration_id = r.id  WHERE ${option} MONTH(p.per_end) = 12 AND r.affiliation = 1006) as other
       ) as other ON arc.month = other.month
            `
        connection.query(sql,function(err, results){
            if(err){
                res.send(sql)
                throw err;
            }
            res.send(results)
        })  

    })  
}
exports.periodsurvey = (req,res)=>{
    req.getConnection((err, connection)=>{
        var periodId = parseInt(req.params.periodId)
            if(err) throw err;
            connection.query(`SELECT COUNT(title) as COUNT, title, SUM(value) / COUNT(title) as Mean, POWER(value - SUM(value) / COUNT(title),2) as Error FROM (SELECT survey.title, survey.id, survey.value FROM survey WHERE per_id = ${periodId} ) as a GROUP by title
            `, function(err, results){
                if(err) throw err;
                res.send(results)
                
            })
    })
}