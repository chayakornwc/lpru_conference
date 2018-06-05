import React, { Component } from 'react'
import {Field,reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import renderField from '../components/Editprofile/renderFields';
import renderSelect from '../components/Editprofile/renderSelect';
import renderSelectPrefix  from '../components/Editprofile/renderSelectPrefix';
import renderChooseGender from '../components/Editprofile/renderChooseGenders';

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
        console.log(initData)
        this.props.initialize(initData)
    }

     componentDidMount(){
        this.handleInitailize();
     }
  render() {
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
                        <label class="label">คำนำหน้า</label>
                    </div>
                    <div class="field-body">
                      <Field component={renderSelectPrefix} type="text" name="prefix"  label="ชื่อ" />
                    </div>
                    </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label class="label">ชื่อ นามสกุล</label>
                    </div>
                    <div class="field-body">
                      <Field component={renderField} type="text" name="first_name"  label="ชื่อ" />
                     <Field component={renderField} type="text" name="last_name"  label="นามสกุล" />
                    </div>
                    </div>

                 
                    <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">เพศ</label>
                    </div>
                    <div class="field-body">
                    <Field component={renderChooseGender}  label="ชาย" type="radio" name="gender"  value="ชาย"/>
                    <Field component={renderChooseGender}  label="หญิง"  type="radio" name="gender"  value="หญิง"/>
                    </div>
                    </div>

                    <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">ที่อยู่</label>
                    </div>
                    <div class="field-body">
                     <Field component={renderField} type="text" name="address" label="ที่อยู่เลขที่" />
                     <Field component={renderField} type="text" name="city" label="ตำบล" />
                     <Field component={renderField} type="text" name="district" label="อำเภอ" />
                    </div>
                    </div>

                    <div class="field is-horizontal">
                    <div class="field-label">
                     จังหวัด
                    </div>
                    <div class="field-body">
                        <Field component={renderSelect} data={_province} type="text" name="province" />
                    </div>
                    </div>
                    <div class="field is-horizontal">
                    <div class="field-label">
                     Email
                    </div>
                    <div class="field-body">
                        <Field component={renderField} disabled={true} type="text" name="email" />
                    </div>
                    </div>
                    <div class="field is-horizontal">
                    <div class="field-label">
                     ภาควิชา สำนัก และสังกัด
                    </div>
                    <div class="field-body">
                        <Field component={renderField} disabled={true} type="text" name="major" label="สาขาวิชา" />
                        <Field component={renderField} disabled={true} type="text" name="affiliation" label="สำนัก" />
                        <Field component={renderField}  type="text" name="company" label="สังกัด" />
                    </div>
                    </div>
                    <div class="field is-horizontal">
                    <div class="field-label">
                        {/* action */}
                    </div>
                    <div class="field-body">
                        <div class="field">
                        <div class="control">
                            <button class="button is-mystyle">
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
     }
 }
 
 Editprofile = connect(mapStateToProps)(Editprofile);


export default form(Editprofile)
