import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadOrder} from '../redux/actions/courseOrderActions';
import courseorderReducers from '../redux/reducers/courseorderReducers';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import 'moment/locale/th';
import Loader from '../components/Utils/loader';
import {examinationChecker} from '../redux/actions/examinationActions';
import axios from 'axios';
import config from '../configure';
import { values } from 'redux-form';
//config
const BASE_URL = config.BASE_URL
const moment = require('moment');

moment.locale('th');
 class Profile extends Component {
     constructor(props){
         super(props);
     }
     static contextTypes = {
        router: PropTypes.object
      }
      redirectToTarget = (id) => {
        this.context.router.push(`/events/${id}`)
      }
      renderExamination = (status, id)=>{
            switch(status){
                case 4:return <a className="button is-mystyle" href={`/examination/${id}`} >เข้าสอบ</a>
                default : return <button className="button is-danger" disabled="disabled">ปิดสอบ</button>
                break;
            }
        }  
        certificateCheck = (per_id)=>{
         const  data = {
                    per_id:per_id,
                    sub:this.props.auth.sub
                  }
        return  axios({  method:'get',
            url:`${BASE_URL}/examination/check/${data.per_id}/${data.sub}`,
            headers:{authorization:localStorage.getItem('token')}}).then(resutls =>{
            })
          
        }

     componentDidMount(){
      return this.props.auth && this.props.dispatch(loadOrder(this.props.auth.sub)).then(()=>{
      })
     }
        
     
        
  render() {
      const {auth,orders} = this.props
    return (
      <div className="container" style={{paddingTop:"1.25rem"}}>
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    รายละเอียดผู้ใช้
                </p>
            </header>
            <div className="card-content">
                <div className="content">
                    <div className="columns ">
                    
                        <div className="colum" style={{paddingRight:'1rem'}}>
                        <strong>รหัสนักศึกษา</strong> {auth && auth.username} 
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>ชื่อ - นามสกุล</strong> {auth && auth.fullname}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>สาขาวิชา</strong> {auth && auth.major ? auth.major : 'ไม่ระบุ'}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>คณะ / สำนัก</strong> {auth && auth.major ? Affiliation(auth.affiliation) : 'ไม่ระบุ'}
                        </div>
                    </div>
                    <div className="columns is-mobile" style={{paddingTop:'.5rem'}}>
                        <div className="colum" style={{paddingRight:'1rem'}}>
                        <strong>ที่อยู่</strong> {auth && auth.address ? auth.address :'ไม่ระบุ'} 
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>อำเภอ</strong> {auth && auth.district ? auth.district :'ไม่ระบุ'}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>จังหวัด</strong> {auth && auth.province ? auth.province : 'ไม่ระบุ'}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>สังกัด / หน่วยงาน</strong> {auth && auth.company ? auth.company : 'ไม่ระบุ'}
                        </div>
                    </div>
                </div>
            </div>
                <footer className="card-footer"><a href="profile/edit" className="button is-warning">แก้ไขข้อมูล</a></footer>
            </div>
            <div className="content" style={{paddingTop:'1rem'}}>
                <div className="card">
                <header className="card-header">
                    รายการอบรมที่เข้าร่วม
                </header>
                <div className="card-content">
                    <table className="table is-bordered is-striped is-linked">
                        <thead>
                            <tr>
                                <th>ที่</th>
                                <th>ชื่อหลักสูตร</th>
                                <th>วันที่อบรม</th>
                                <th>วิทยากร</th>          
                                <th>สอบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.isLoading && <Loader/>}
                            {orders.data && orders.data.map((e,i)=>{
                                return(
                                   <tr  key={i} onClick={()=>{this.redirectToTarget(e.per_id)}}>
                                        <td>{(i+1)}</td>
                                        <td>{e.course_name}</td>
                                        <td>{moment(e.per_start).add(543, 'years').format('ll')} - {moment(e.per_end).add(543, 'years').format('ll')}</td>
                                        <td>{e.lecture ? e.lecture : 'ไม่ระบุ'}</td>
                                        <td>{this.renderExamination(e.per_status, e.per_id)}</td>
                                  </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
               </div> 
            </div>
      </div>
    )
  }
}
function mapStateToProps(state){
    return{
        auth:state.authReducers.data,
        orders:state.courseorderReducers.orders
    }
}
export default connect(mapStateToProps)(Profile)

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