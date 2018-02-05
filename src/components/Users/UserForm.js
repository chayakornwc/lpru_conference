import React, { Component } from 'react';
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../Utils/renderFields';
class UserForm extends Component {
    componentDidMount(){
        this.handleInitialize()
    }
    handleInitialize() {
        let initData = {
        "user_type": "0",
        "name": '',
        "username": '',
        "password": ''
        };
        if (this.props.data.id) {
                initData = this.props.data
                initData.user_type = this.props.data.user_type.toString()
            }

            this.props.initialize(initData);
        }   

    render() {
        const { handleSubmit, userSave } = this.props
        return (
            <div>
                <ModalBody>
                    {/* ตรวจสอบว่ามี err หรือไม่ */}
                    {userSave.isRejected && <div className="alert alert-danger">{userSave.data}</div>}
                    {/* รูปแบบการแสดงผลจัดตาม Bootstrap 4 */}
                    <div className="form-group row">
                    <label className="col-sm-3 col-form-label">ประเภทผู้ใช้</label>
                    <div className="col-sm-9">
                    <div className="form-check form-check-inline">
                    <label className="form-check-label">
                    <Field
                    className="form-check-input"
                    name="user_type"
                    component="input"
                    type="radio"
                    value='0'
                    />{' '}
                    ทั่วไป
                    </label>
                    </div>
                    <div className="form-check form-check-inline">
                    <label className="form-check-label">
                    <Field
                    className="form-check-input"
                    name="user_type"
                    component="input"
                    type="radio"
                    value="1"
                    />{' '}ผู้ดูแลระบบ
                    </label>
                    </div>
                    </div>
                    </div>
                    <Field name="name" component={renderField} type="text" label="ชื่อ-สกุล" autoFocus />
                    <Field name="username" component={renderField} type="text" label="Username" />
                    <Field name="password" component={renderField} type="password" label="Password" />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
                    </ModalFooter>
            </div>
        );
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
    function validate(values){
        // const error={};
        // if (!values.name) {
        //     errors.name = 'จำเป็นต้องกรอกชื่อ-สกุล';
        //     }
        //     if (!values.username) {
        //     errors.username = 'จำเป็นต้องกรอก Username !';
        //     } else if (values.username.length < 3) {
        //     errors.username = 'Username ต้องมากกว่า 3 ตัวอักษร !';
        //     }
        //     return errors;

        }
     const form = reduxForm({
        form: 'UserForm',
        validate
        })  


export default form(UserForm);