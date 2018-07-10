import React, { Component } from 'react'
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {saveUser} from '../redux/actions/userActions';
import renderField from '../components/Editprofile/renderFields';
import renderSelect from '../components/Editprofile/renderSelect';
import renderSelectAffiliation from'../components/Editprofile/renderSelectAffiliation';
import renderSelectPrefix  from '../components/Editprofile/renderSelectPrefix';
import renderChooseGender from '../components/Editprofile/renderChooseGenders';
import { updateToken } from '../redux/actions/authActions';
const affiliation = [
    {id:1000, label:"มหาวิทยาลัยราชภัฏลำปาง"},
    {id:1001, label:"สำนักงานอธิการบดี"},                             
    {id:1002, label:"คณะครุศาสตร์"},      
    {id:1003, label:"คณะมนุษยศาสตร์และสังคมศาสตร์"},
    {id:1004, label:"คณะวิทยาศาสตร์"},
    {id:1005, label:"คณะวิทยาการจัดการ"},
    {id:1006, label:"คณะเทคโนโลยีการเกษตร"},
    {id:1007, label:"คณะเทคโนโลยีอุตสาหกรรม"},                         
    {id:1008, label:"กองบริการการศึกษา"},                      
    {id:1009, label:"กองนโยบายและแผน"},
    {id:1010, label:"กองพัฒนานักศึกษา"},
    {id:1011, label:"สถาบันวิจัยและพัฒนา"},
    {id:1012, label:"สำนักศิลปะและวัฒนธรรม"},
    {id:1014, label:"ศูนย์คอมพิวเตอร์"},                          
    {id:1015, label:"โครงการจัดตั้งสถาบันภาษา"},
    {id:1016, label:"ศูนย์วิทยาศาสตร์และวิทยาศาสตร์ประยุกต์"},   
    {id:1017, label:"ศูนย์เวชศึกษาป้องกัน"},
    {id:1018, label:"ศูนย์จีน"},   
    {id:1019, label:"ศูนย์วิทยบริการ"},      
    {id:1020, label:"ศูนย์การศึกษาพัฒนาครู"},
    {id:1021, label:" บัณฑิตศึกษา"},
    {id:1024, label:"สำนักวิทยบริการและเทคโนโลยีสารสนเทศ"},             
    {id:1025, label:"หน่วยตรวจสอบภายใน"},
    {id:1028, label:"งบกลางมหาวิทยาลัย"}, 
    {id:1029, label:"ศูนย์ฝึกปฏิบัติวิชาชีพอาลัมพาง"},  
    {id:1030, label:"สำนักงานสภามหาวิทยาลัย"},                         
    {id:1031, label:"สภาคณาจารย์และข้าราชการ"},                          
    {id:1032, label:"โรงเรียนสาธิตมหาวิทยาลัยราชภัฏลำปาง"},
    {id:2000, label:"บุคคลภายนอก"}         
  ];
  const _province = ['กรุงเทพฯ',
    'กระบี่',
    'กาญจนบุรี',
    'กาฬสินธุ์',
    'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี',
    'ชัยนาท',
    'ชัยภูมิ',
    'ชุมพร',
    'เชียงใหม่',
    'เชียงราย',
    'ตรัง',
    'ตราด',
    'ตาก',
    'นครนายก',
    'นครปฐม',
    'นครพนม',
    'นครราชสีมา',
    'นครศรีธรรมราช',
    'นครสวรรค์',
    'นนทบุรี',
    'นราธิวาส',
    'น่าน',
    'บึงกาฬ',
    'บุรีรัมย์',
    'ปทุมธานี',
    'ประจวบคีรีขันธ์',
    'ปราจีนบุรี',
    'ปัตตานี',
    'พระนครศรีอยุธยา',
    'พะเยา',
    'พังงา',
    'พัทลุง',
    'พิจิตร',
    'พิษณุโลก',
    'เพชรบุรี',
    'เพชรบูรณ์',
    'แพร่',
    'ภูเก็ต',
    'มหาสารคาม',
    'มุกดาหาร',
    'แม่ฮ่องสอน',
    'ยโสธร',
    'ยะลา',
    'ร้อยเอ็ด',
    'ระนอง',
    'ระยอง',
    'ราชบุรี',
    'ลพบุรี',
    'ลำปาง',
    'ลำพูน',
    'เลย',
    'ศรีสะเกษ',
    'สกลนคร',
    'สงขลา',
    'สตูล',
    'สมุทรปราการ',
    'สมุทรสงคราม',
    'สมุทรสาคร',
    'สระแก้ว',
    'สระบุรี',
    'สิงห์บุรี',
    'สุโขทัย',
    'สุพรรณบุรี',
    'สุราษฎร์ธานี',
    'สุรินทร์',
    'หนองคาย',
    'หนองบัวลำภู',
    'อ่างทอง',
    'อำนาจเจริญ',
    'อุดรธานี',
    'อุตรดิตถ์',
    'อุทัยธานี',
    'อุบลราชธานี'];
const alertify = require('alertify.js');

 class Editprofile extends Component {

    handleInitailize(){
      const  {auth} = this.props
      let fullname = auth.fullname ? auth.fullname.split(/[ ,]/) : '';
        let initData = {
            "id":auth.sub,
            "prefix":fullname[0],
            "first_name":fullname[1],
            "last_name":fullname[2],
            "gender":auth.gender,
            "address":auth.address,
            "city":auth.city,
            "district":auth.district,
            "province":auth.province,
            "email":auth.email,
            "major":auth.major,
            "affiliation":auth.affiliation,
            "company":auth.company,
        }
        this.props.initialize(initData)
    }

     componentDidMount(){
        this.handleInitailize();
     }
     handleSubmit=(values)=>{

       return( 
            this.props.dispatch(saveUser(values)).then(()=>{
                if(!this.props.userSave.isRejected){
                    alertify.success("แก้ไขข้อมูลเรียบร้อยแล้ว")
                    this.props.dispatch(updateToken()).then(()=>{
                        this.handleInitailize();
                    })
                  
                    }else{

            }
            })
        )
     }
  render() {
      
    
     const {handleSubmit} = this.props
        
    return (
      <div className="container" style={{paddingTop:'1rem'}}> 
        <div className="card"> 
            <header className="card-header">
            <p>แก้ไขข้อมูลผู้ใช้</p>
            </header>
            <div className="card-content">
                <div className="content">
                <form>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">คำนำหน้า</label>
                    </div>
                    <div className="field-body">
                      <Field component={renderSelectPrefix} type="text" name="prefix"  label="ชื่อ" />
                    </div>
                    </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">ชื่อ นามสกุล</label>
                    </div>
                    <div className="field-body">
                     <Field component={renderField} type="text" name="first_name"  label="ชื่อ" />
                     <Field component={renderField} type="text" name="last_name"  label="นามสกุล" />
                    </div>
                    </div>

                 
                    <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">เพศ</label>
                    </div>
                    <div className="field-body">
                    <Field component={renderChooseGender}  label="ชาย" type="radio" name="gender"  value="ชาย"/>
                    <Field component={renderChooseGender}  label="หญิง"  type="radio" name="gender"  value="หญิง"/>
                    </div>
                    </div>

                    <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">ที่อยู่</label>
                    </div>
                    <div className="field-body">
                     <Field component={renderField} type="text" name="address" label="ที่อยู่เลขที่" />
                     <Field component={renderField} type="text" name="city" label="ตำบล" />
                     <Field component={renderField} type="text" name="district" label="อำเภอ" />
                    </div>
                    </div>

                    <div className="field is-horizontal">
                    <div className="field-label">
                     จังหวัด
                    </div>
                    <div className="field-body">
                        <Field component={renderSelect} data={_province} type="text" name="province" />
                    </div>
                    </div>
                    <div className="field is-horizontal">
                    <div className="field-label">
                     Email
                    </div>
                    <div className="field-body">
                        <Field component={renderField}  type="text" name="email" />
                    </div>
                    </div>
                    <div className="field is-horizontal">
                    <div className="field-label">
                     ภาควิชา สำนัก และสังกัด
                    </div>
                    <div className="field-body">
                        <Field component={renderField} type="text" name="major" label="สาขาวิชา" />
                        <Field component={renderSelectAffiliation} data={affiliation}   name="affiliation" label="สำนัก" />
                        <Field component={renderField}  type="text" name="company" label="สังกัด" />
                    </div>
                    </div>
                    <div className="field is-horizontal">
                    <div class="field-label">
                        {/* action */}
                    </div>
                    <div className="field-body">
                        <div className="field">
                        <div className="control">
                            <button className="button is-mystyle" onClick={handleSubmit(this.handleSubmit)} type="button">
                            บันทึก
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
const form = reduxForm({
    form: 'Editprofile',
   
 })
 
 
 function mapStateToProps(state){
     return{
        auth:state.authReducers.data,
        userSave:state.userReducers.userSave
     }
 }
 
 Editprofile = connect(mapStateToProps)(Editprofile);


export default form(Editprofile)
