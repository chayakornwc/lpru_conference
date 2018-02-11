import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm, renderField } from 'redux-form';

//import { Modal, ModalHeader, Button, ModalBody, ModalFooter } from 'reactstrap';

//รูปแบบการเขียนต่อไปนี้จะเข้าใจยากครับต้องใช้เวลานานเพื่อทำและทดสอบ
//มันเป็นรูปแบบของการสร้าง Element ขึ้นมาใหม่
export default class ReactModalDialog extends Component {
    //เก็บ State เพื่อกำหนดว่าจะให้แสดง Modal หรือไม่
    state = {
        modal: this.props.show
    }
    componentDidMount() {
        this.handleInitialize() 
    }

    
    handleInitialize() {
        let initData = {
            "id":null,
            "user_group": "0",
            "name": '',
            'first_name':'',
            'last_name':'',
            "username": '',
            "password": ''
        };
    
  
        if (this.props.data.id) {
            initData = this.props.data
            //group ที่รับมาเป็น init แต่value ต้องแปลงเป็น string ก่อน
            initData.user_group = this.props.data.user_group.toString()
        }
        this.props.initialize(initData);
    }
    //ใช้งาน PropTypes เป็นการเช็คค่า Props ที่ส่งเข้ามาว่าตรงตามที่เรากำหนดหรือไม่
    //เหมือนการตรวจสอบการทำงานของโปรแกรมเพื่อไม่ให้เกิดข้อผิดพลาด
    static propTypes = {
        type: PropTypes.string, //รับค่าตัวข้อความ warning, info
        show: PropTypes.bool,   //รับค่า true , false เพื่อกำหนดว่าจะแสดง Modal หรือไม่
        title: PropTypes.string,    //รับค่าข้อความเพื่อแสดงหัวของ Modal
        message: PropTypes.string,  //ข้อความที่ต้องการให้ปรากฏใน Modal
        confirmLabel: PropTypes.string, //ข้อความปุ่มยืนยัน
        cancelLabel: PropTypes.string,  //ข้อความปุ่มยกเลือก
        onConfirm: PropTypes.func,  //เมื่อยืนยันจะให้เรียกใช้ function อะไร
        onCancel: PropTypes.func,   //เมื่อยกเลือกจะให้เรียกใช้ function อะไร
        children: PropTypes.node,   //สามารถระบุ element ย่อยได้ ปกติจะไม่ได้ใช้
    };

    //กำหนด Default Props
    static defaultProps = {
        type: 'warning',
        show: false,
        title: '',
        message: '',
        childrenElement: () => null,
        confirmLabel: '',
        cancelLabel: 'ปิด',

    };

    //ควบคุมการแสดง Modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })

        const target = document.getElementById('react-widget-dialog');
        if (target) {
            target.parentNode.removeChild(target);
        }
    }

    onSubmit = (values) => {
        this.props.onSubmit(values);
    }

    onClickCancel = () => {
        this.props.onCancel();
        this.toggle()
    };

    render() {
        const { title, message, confirmLabel, cancelLabel, type,users, user, userSave, handleSubmit } = this.props;
      
        const active = this.state.modal ? 'is-active':'is-passive'; 
        let buttonColor;
        switch (type) {
            case 'info':
                buttonColor = "info";
              
                break;
            default:
                buttonColor = "warning";
               
                break;
        }
      
        return (
            <div>
                <div className={"modal "+active} toggle={this.toggle} >
                <div className="modal-background"></div>
                    <div className="modal-card" >
                    <div >
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
                    <Field name="name" component={renderField}  type="text" label="ชื่อ-สกุล" autoFocus />
                    <Field name="username" component={renderField} type="text" label="Username" />
                    <Field name="password" component={renderField} type="password" label="Password" />
                </div>

                <footer className="modal-card-foot">
                   
                </footer  >
                    <section className="modal-card-body">
                        {message}
                    </section>

                    <footer className="modal-card-foot">
                    <Button className="button is-danger" color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button className="button" onClick={this.toggle}>ยกเลิก</Button>
                    </footer>
                    </div> 
                </div>
            </div>
        )
    }
}
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
const form = reduxForm({
    form: 'UserForm',
    validate
})
//ฟังก์ชันสร้าง Element โดยจะวาดลงภายใน Div
function createElementDialog(properties) {
    const divTarget = document.createElement('div');
    divTarget.id = 'react-widget-dialog';
    document.body.appendChild(divTarget);
    render(<ReactModalDialog {...properties} />, divTarget);
}

//สุดท้ายส่งออกเป็นชื่อ confirmModalDialog
export function ReactModalDialog(properties) {
    createElementDialog(properties);
}