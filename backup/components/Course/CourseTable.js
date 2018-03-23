import React, { Component } from 'react';
import { Badge,Row,Col,Card,CardHeader,CardBody,Table,Pagination,PaginationItem,PaginationLink } from 'reactstrap';
const moment = require('moment');
moment.locale('th');

class CourseTable extends Component {

    
    render() {
        const {data, buttonDelete, buttonEdit} = this.props
        const statusColor = (data)=>{
            switch(data){
              case 1:
              return 'success';
              break;
              default:
              return'danger';
              break;
           }
          }
          const statusName = (data) =>{
            switch(data){
              case 0 :
              return 'ระงับการใช้งาน';
              case 1:
              return 'เปิดใช้งาน';
              break;
              default:
              return 'รอการตรวจสอบ';
              break;
            }
          }
        return (
            <div>   
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-note"></i> จัดการ หลักสูตร <a href="/#/course/register"><i className="icon-plus float-right"></i></a>
              </CardHeader>
              <CardBody>
                <Table hover striped responsive> 
                  <thead>
                  <tr>
                    <th>ชื่อหลักสูตร</th>
                    <th>วันที่ลงทะเบียน / ปรับปรุง</th>
                    <th>โดย</th>
                    <th>สถานะ</th>
                    <th className="text-center"><i className="icon-settings "></i></th>
                  </tr>
                  </thead>
                  <tbody>
                  {data && data.map(e =>{
                    return(
                      <tr key={e.course_id}>
                        <td>{e.course_name+' ('}{e.course_nameEng+') '}</td>
                        <td>{moment(e.time_stamp).format('lll')}</td>
                        <td>ไม่ระบุ</td>
                        <td><Badge color={statusColor(e.course_status)}>{statusName(e.course_status)}</Badge></td>
                        <td className="text-center"><i onClick={()=>buttonEdit(e.course_id)} className="fa fa-edit"></i>{' '}<i onClick={()=>buttonDelete(e.course_id)} className="fa fa-times"></i></td>
                      </tr>
                    )
                  })}                
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>           
            </div>
        );
    }
}



export default CourseTable;