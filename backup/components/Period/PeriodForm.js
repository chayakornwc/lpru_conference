import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalFooter, ModalHeader, Modal, Form, FormGroup, Col, Label } from 'reactstrap';
import renderSelect from '../../views/Theme/Coursemanage/Utils/renderSelect';
import renderSelectRoom from '../../views/Theme/Coursemanage/Utils/renderSelectRoom';
import renderTimepicker from '../../views/Theme/Coursemanage/Utils/renderTimepicker';
import renderDatepicker from '../Utils/renderDatepicker';
import { Field, reduxForm } from 'redux-form';
import renderField from '../Utils/renderFields';
class PeriodForm extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        this.handleInitialize();
    }
    handleInitialize(){ 
        let initData = {
            course_id:'',
            course_status:null,
            course_name:'',
            course_nameEng:'',
            course_detail:''
        }
            if(this.props.data.course_id){
                initData = this.props.data
                //status ที่รับมาเป็น init แต่value ต้องแปลงเป็น string ก่อน
                initData.course_status = this.props.data.course_status.toString()
            }
            // method of redux-form
           
            this.props.initialize(initData);
    }
        toggle = () => {
            this.props.onToggle();
        }
        onSubmit = (values) => {
            this.props.onSubmit(values);
        }
    
    render() {
        // handleSubmit  properties of redux form
        const { data, periodSave, onSubmit, handleSubmit , modalTitle, onToggle, course, operation_rooms} = this.props
        console.log(course)
        return (
            <div>
                <ModalHeader toggle={onToggle}>{modalTitle}</ModalHeader>
                 <ModalBody>
                    {/* ตรวจสอบว่ามี err หรือไม่ */}
                    {periodSave.isRejected && <div className="alert alert-danger">{periodSave.data}</div>}

                    {/* รูปแบบการแสดงผลจัดตาม Bootstrap 4 */}
                    <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="appendedInputButton">วันที่อบรม</Label>
                                        </Col>
                                        <Col md="4">
                                            <Field name="per_start" component={renderDatepicker} type="time"  placeholder="วันที่เริ่มอบรม" /> 
                                        </Col>
                                        <i className="fa fa-angle-right fa-lg mt-2"></i>{'  '}
                                        <Col md="4">   
                                            <Field name="per_end" component={renderDatepicker}  placeholder="สิ้นสุดการอบรม" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="appendedInputButton">ช่วงเวลาที่อบรม</Label>
                                        </Col>
                                        <Col md="auto">
                                            <Field name="per_time_start" component={renderTimepicker} placeholder=""/>
                                        </Col>
                                        {' '}<i className="fa fa-angle-right fa-lg mt-2"></i>{' '}
                                        <Col md="auto">
                                            <Field name="per_time_end" component={renderTimepicker}/>
                                        </Col>
                                    </FormGroup>

                                        <Field name="course_id" data={course.data} label="หลักสูตร"   component={renderSelect} />

                                     <FormGroup>
                                        <Field name="per_price" component={renderField}  type="number" label="ค่าใช้จ่ายต่อหัว" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Field name="per_quota" component={renderField}  type="number" label="จำนวนที่นั่ง" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Field name="room_id" data={operation_rooms.data}  component={renderSelectRoom} label="ห้องปฏิบัติการ" />
                                    </FormGroup>
                        </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                    <Button color="secondary" onClick={onToggle}>ยกเลิก</Button>
                </ModalFooter>
            </div>
        );
    }

}

function validate(values){
    const errors ={};
    if(!values.per_start){
        errors.per_start = 'กรุณาเลือก'
    }
    if(!values.per_end){
        errors.per_end='กรุณาเลือก'
    }
    if(!values.per_time_start){
        errors.per_time_start ="กรุณาเลือก"
    }
    if(!values.per_time_end){
        errors.per_time_end ="กรุณาเลือก"
    }
    if(!values.course_id){
        errors.course_id ="กรุณาเลือก"
    }
    if(!values.per_price){
        errors.per_price = "ต้องกรอกฟิลด์นี้"
    }
    if(!values.per_quota){
        errors.per_quota = "ต้องกรอกฟิลด์นี้_"
    }
    if(!values.room_id){
        errors.room_id ="กรุณาเลือก"
    }
    return errors;
}



PeriodForm.propTypes = {

};


const form = reduxForm({
    form: 'PeriodForm',
    validate
})
export default form(PeriodForm)

