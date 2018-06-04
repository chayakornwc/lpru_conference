import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadOrder} from '../redux/actions/courseOrderActions';
import courseorderReducers from '../redux/reducers/courseorderReducers';
 class Profile extends Component {
     constructor(props){
         super(props);
     }
     componentDidMount(){
      return this.props.dispatch(loadOrder(this.props.auth.sub)).then(()=>{
          console.log(this.props.orders)
      })
     }

        
  render() {
      const {auth,orders} = this.props
      console.log(orders)
    return (
      <div className="container" style={{paddingTop:"1.25rem"}}>
        <div className="card">
            <header class="card-header">
                <p class="card-header-title">
                    รายละเอียดผู้ใช้
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <div className="columns ">
                        <div className="colum" style={{paddingRight:'1rem'}}>
                        <strong>รหัสนักศึกษา</strong> {auth.username} 
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>ชื่อ - นามสกุล</strong> {auth.fullname}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>สาขาวิชา</strong> {auth.major ? auth.major : 'ไม่ระบุ'}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>คณะ / สำนัก</strong> {auth.major ? Affiliation(auth.affiliation) : 'ไม่ระบุ'}
                        </div>
                    </div>
                    <div className="columns is-mobile" style={{paddingTop:'.5rem'}}>
                        <div className="colum" style={{paddingRight:'1rem'}}>
                        <strong>ที่อยู่</strong> {auth.address ? auth.address :'ไม่ระบุ'} 
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>อำเภอ</strong> {auth.district ? auth.district :'ไม่ระบุ'}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>จังหวัด</strong> {auth.province ? auth.province : 'ไม่ระบุ'}
                        </div>
                        <div className="colum " style={{paddingRight:'1rem'}}>
                        <strong>สังกัด / หน่วยงาน</strong> {auth.company ? auth.company : 'ไม่ระบุ'}
                        </div>
                    </div>
                </div>
            </div>
                <footer className="card-footer"><a href="profile/edit" className="button is-warning">แก้ไขข้อมูล</a></footer>
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