import React, { Component } from 'react'
import {getPeriod} from '../redux/actions/periodActions';
import {getAttendee} from '../redux/actions/AttendsActions';
import {connect} from 'react-redux'
import Loader from '../components/Utils/loader';
import   'moment/locale/th';

const moment = require('moment');
// Markdown data
const Affiliation = (data) =>{
  switch(data){
      case 1000:return	'มหาวิทยาลัยราชภัฏลำปาง'
      break;                            
      case 1001:return	'สำนักงานอธิการบดี'
      break;                                 
      case 1002:return	'คณะครุศาสตร์'
      break;                                      
      case 1003:return	'คณะมนุษยศาสตร์และสังคมศาสตร์'
      break;                      
      case 1004:return	'คณะวิทยาศาสตร์'
      break;                                    
      case 1005:return	'คณะวิทยาการจัดการ'
      break;                                 
      case 1006:return	'คณะเทคโนโลยีการเกษตร'
      break;                              
      case 1007:return	'คณะเทคโนโลยีอุตสาหกรรม'
      break;                            
      case 1008:return	'กองบริการการศึกษา'
      break;                                 
      case 1009:return	'กองนโยบายและแผน'
      break;                                   
      case 1010:return	'กองพัฒนานักศึกษา'
      break;                                  
      case 1011:return	'สถาบันวิจัยและพัฒนา'
      break;                               
      case 1012:return	'สำนักศิลปะและวัฒนธรรม'
      break;                             
      case 1014:return	'ศูนย์คอมพิวเตอร์'
      break;                                  
      case 1015:return	'โครงการจัดตั้งสถาบันภาษา'
      break;                          
      case 1016:return	'ศูนย์วิทยาศาสตร์และวิทยาศาสตร์ประยุกต์'
      break;            
      case 1017:return	'ศูนย์เวชศึกษาป้องกัน'
      break;                              
      case 1018:return	'ศูนย์จีน'
      break;                                          
      case 1019:return	'ศูนย์วิทยบริการ'
      break;                                   
      case 1020:return	'ศูนย์การศึกษาพัฒนาครู'
      break;                             
      case 1021:return	'บัณฑิตศึกษา'
      break;                                       
      case 1024:return	'สำนักวิทยบริการและเทคโนโลยีสารสนเทศ'
      break;               
      case 1025:return	'หน่วยตรวจสอบภายใน'
      break;                                 
      case 1028:return	'งบกลางมหาวิทยาลัย'
      break;                                 
      case 1029:return	'ศูนย์ฝึกปฏิบัติวิชาชีพอาลัมพาง'
      break;                    
      case 1030:return	'สำนักงานสภามหาวิทยาลัย'
      break;                            
      case 1031:return	'สภาคณาจารย์และข้าราชการ'
      break;                           
      case 1032:return	'โรงเรียนสาธิตมหาวิทยาลัยราชภัฏลำปาง'
      break;
      default : return 'ไม่ระบุ';
  }
}
moment.locale('th');
 class EventsDetail extends Component {
     constructor(props){
         super(props)
         
     }
    
     componentDidMount(){
       return (
           this.props.dispatch(getPeriod(this.props.params.id))
        ).then(()=>{
          this.props.dispatch(getAttendee(this.props.params.id))
        })
     }
    
  render() {
      const id = this.props.params.id
      const {period,attenders} = this.props
     
    return (
      <div className style={{paddingTop:'1.25rem'}}>
        <div className="container">
          {period.isLoading && <div className="is-centered"><Loader /></div>}
            <div className="card">
                <header className="card-header">
                        <p className="card-header-title">
                         รหัสการอบรม: CCOO-{period.data && period.data.per_id} ชื่อหลักสตูร : {period.data && period.data.course_name} อบรมวันที่: {period.data && moment(period.data.per_start).add(543, 'years').format('ll')} ถึง {period.data && moment(period.data.per_end).add(543, 'years').format('ll')} เวลา {period.data && period.data.per_time_start} ถึง  {period.data && period.data.per_time_end}
                    </p> 
                </header>
  <div class="card-content">
    <div class="content">
     {attenders.isLoading && <Loader/>}
    <header className="card-header">
                        <p className="card-header-title">
                         รายชื่อผู้เข้าร่วม
                    </p> 
                </header>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>เลขที่</th>
                  <th>รหัสนึกศึกษา / ชื่อผู้ใช้</th>
                  <th>ชื่อ - นามกุล</th>
                  <th>สาขาวิชา</th>
                  <th>คณะ/สำนัก</th> 
                </tr>
              </thead>
              <tbody>
                {attenders.data && attenders.data.map((e,i)=>{
                  return (
                    <tr key={i}>
                    <td>{(i+1)}</td>
                    <td>{e.username}</td>
                    <td>{e.fullname}</td>
                    <td>{e.major}</td>
                    <td>{Affiliation(e.affiliation)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
    </div>
  </div>
  <footer class="card-footer">
    วิทยากร: {period.data &&period.data.lecture}
  </footer>
</div>
          </div>
      </div>
    )
  }
}
function mapStateToprops(state){
    return{
        period:state.periodReducers.period,
        attenders:state.attendsReducers.attenders
    }
}

export default connect(mapStateToprops)(EventsDetail);