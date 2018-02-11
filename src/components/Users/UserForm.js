import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import renderField from '../Utils/renderFields'

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
        }
        this.props.initialize(initData);
    }
    render() {
        //redux-form จะมี props ที่ชื่อ handleSubmit เพื่อใช้ submit ค่า
        // this.handleInitialize();
        const { handleSubmit, userSave, data} = this.props

      
        return (
            <div>
                <header className="modal-card-head">
                    <p className="modal-card-title">{this.props.header}</p>
                </header>
                <div className="modal-body">
                    {/* ตรวจสอบว่ามี err หรือไม่ */}
                    {userSave.isRejected && <div className="alert alert-danger">{userSave.data}{data.id}</div>}

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
                    <Field name="first_name" component={renderField}  type="text" label="ชื่อ" autoFocus />
                    <Field name="last_name" component={renderField}  type="text" label="นามสกุล"  />
                    <Field name="username" component={renderField} type="text" label="Username" />
                    <Field name="password" component={renderField} type="password" label="Password" />
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
    if (!values.name) {
        errors.name = 'จำเป็นต้องกรอกชื่อ-สกุล';
    }

    if (!values.username) {
        errors.username = 'จำเป็นต้องกรอก Username !';
    } else if (values.username.length < 3) {
        errors.username = 'Username ต้องมากกว่า 3 ตัวอักษร !';
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