import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import renderField from '../Utils/renderFields'
const alertify = require('alertify.js');
const selectStyle ={
    marginLeft:'61px',
    marginBottom:'1rem',
    borderRadius:'0.2rem'
}
const prefxtitle = [
    {
      value: 'อาจารย์',
      label: 'อาจารย์',
    },
    {
      value: 'ดร.',
      label: 'ดร.',
    },
    {
      value: 'นาย', 
      label: 'นาย',
    },
    {
      value: 'นางสาว',
      label: 'นางสาว',
    }, 
  
   
  ];
class UserForm extends Component {

    
    componentDidMount() {
        //เรียกใช้ฟังก์ชันในการกำหนด value ให้กับ textbox และ control ต่างๆ
        this.handleInitialize()
    }

    //กำหนดค่า value ให้กับ textbox หรือ control ต่างๆ ในฟอร์ม
    //ถ้าเป็น HTML ธรรมดาก็จะกำหนดเป็น value="xxx" แต่สำหรับ redux-form
    //ต้องใช้ initialize ถ้าเป็น redux-form v.6 ต้องประกาศใช้ initialize แต่ v.7 เรียกใช้ได้เลย
    handleInitialize() {
        let initData = {
            "user_group": "",
            "first_name": '',
            "last_name":'',
            "username": '',
            "password": ''
        };

        //ตรวจสอบก่อนว่ามี data.id หรือไม่
        //ถ้าไม่มีแสดงว่าเป็นการสร้างรายการใหม่
        //ถ้ามีแสดงว่ามีการ get ข้อมูลผู้ใช้งานจึงเป็นการปรับปรุง
        if (this.props.data.id) {
            initData = this.props.data
            //user_type ที่รับมาเป็น init แต่value ต้องแปลงเป็น string ก่อน
            initData.user_group = this.props.data.user_group.toString()
            initData.password = '';
        }
        this.props.initialize(initData);
    }
    render() {
        //redux-form จะมี props ที่ชื่อ handleSubmit เพื่อใช้ submit ค่า
        // this.handleInitialize();
        const { handleSubmit, userSave, data} = this.props
        console.log(data);
       
       // {userSave.i}
        return (
            <div>
                <header className="modal-card-head">
                    <p className="modal-card-title">{this.props.header}</p>
                    <button className="delete" onClick={this.toggle}></button>
                </header>
                <div className="modal-body">
                    {/* ตรวจสอบว่ามี err หรือไม่ */}
                    {userSave.isRejected && <div className="alert alert-danger">{userSave.data}</div>}

                    {/* รูปแบบการแสดงผลจัดตาม Bootstrap 4 */}
                    <div className="form-group row">
                                   
                        <div className="select">
                        <Field name="user_group"  className="select" component="select">
                            <option>ประเภทผู้ใช้</option>
                            <option value="0">บุคลากรภายนอก</option>
                            <option value="1">นักศึกษา</option>
                            <option value="2">ผู้ดูแล</option>
                        </Field>
                       
                        </div> 

                    </div>
                  
                    <label>คำนำหน้าชื่อ</label>
                    <Field  style={selectStyle} name="prefix" className="select" component="select"  label="คำนำหน้า" > 
                        <option />
                        {prefxtitle && prefxtitle.map(result =>(
                                <option value={result.value}>{result.label}</option>
                        ))}                   
                    </Field>
                   
                   
                    <Field name="first_name" component={renderField}  type="text" label="ชื่อ" autoFocus />
                    <Field name="last_name" component={renderField}  type="text" label="นามสกุล"  />
                    <Field name="username" component={renderField} type="text" label="Username" />
                    <Field name="password" component={renderField} type="password" label="Password" />
                    <Field name="confirm_password" component={renderField} type="password" label ="ยืนยันรหัสผ่าน" />
                    <div  className="field">
                        <label>เพศ</label>
                        <div className="control" >
                            <label className="radio">
                                <Field name="gender"  component="input" type="radio" value="male"/>{' '}ชาย
                            </label>
                            <label className="radio"> 
                                <Field name="gender" component="input" type="radio" value="female"/>{' '} หญิง
                            </label>
                        </div>
                    </div>
                    <Field name="affiliation" component={renderField} type="text" label ="สังกัด*" />
                    <Field name="company" component={renderField} type="text" label="หน่วยงาน" />
                    <Field name="address" component={renderField} type="text" label ="ที่อยู่" />
                    <Field name="city" component={renderField} type="text" label ="ตำบล" />
                    <Field name="district" component={renderField} type="text" label ="แขวง/อำเภอ" />   
                    <Field name="province" component={renderField} type="text" label ="เขต/จังหวัด" />    
                    <Field name="email" component={renderField} type="text" label ="ที่อยู่อีเมล" />
            </div>
            
                <footer className="modal-card-foot">
                    <Button className="button is-danger" color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button className="button" onClick={this.toggle}>ยกเลิก</Button>
                </footer  >
             
            </div>
        )
    }

    //ฟังก์ชันนี้เรียกใช้ props ชื่อ onToggle จาก src/pages/User.js เพื่อปิด Modal
    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันส่งการค่าการ submit โดยส่งให้ฟังก์ชันชื่อ onSubmit ที่ได้จาก props
    onSubmit = (values) => {
        this.props.onSubmit(values);
       
    }
}

//validate ข้อมูลก่อน submit
function validate(values) {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'จำเป็นต้องกรอกชื่อ';
    }
    if(!values.last_name){
        errors.last_name = 'จำเป็นต้องกรอก นามสกุล'
    }
    if (!values.username) {
        errors.username = 'จำเป็นต้องกรอก Username !';
    } else if (values.username.length < 6) {
        errors.username = 'Username ต้องมากกว่า 6 ตัวอักษร !';
    }
    if(!values.password){
        errors.password ="จำเป็นต้องกรอก password"
    }else if(values.password.length < 6){
        errors.password = "Password จำเป็นต้องมีไม่น้อยกว่า 6 ตัวอักษร"
    }
    if(!values.confirm_password){
        errors.confirm_password = 'จำเป็นต้องยืนยันรหัสผ่าน'
    }
    else if (values.password != values.confirm_password){
        errors.confirm_password ="การยืนยันรหัสผ่านผิด กรุณาลองอีกครั้ง !"
        errors.password ="การยืนยันรหัสผ่านผิด กรุณาลองอีกครั้ง !"
    } 

    return errors;
}

//เรียกใช้ redux-form โดยให้มีการเรียกใช้การ validate ด้วย
const form = reduxForm({
    form: 'UserForm',
    validate
})

//สังเกตุว่าไม่มีการใช้ connect เลยเพราะเราไม่ได้เป็นตัวจัดการ data โดยตรง
//แต่ส่งสิ่งต่างๆผ่าน props ที่ได้จาก src/pages/User.js
export default form(UserForm)