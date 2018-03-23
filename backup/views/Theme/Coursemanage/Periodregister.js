import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardHeader, CardFooter, CardBody, Collapse, Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

import { loadCourse,getCourse } from '../../../redux/actions/courseActions';
import { savePeriod} from '../../../redux/actions/periodActions';
import {loadRooms} from '../../../redux/actions/operationRoomActions';
import renderField from '../../../components/Utils/renderFields';
import renderDatepicker from '../../../components/Utils/renderDatepicker';
import { Field, reduxForm } from 'redux-form';
import renderSelect from './Utils/renderSelect';
import renderSelectRoom from './Utils/renderSelectRoom';
import renderTimepicker from './Utils/renderTimepicker';
import { connect } from 'react-redux';

const alertify = require('alertify.js');

const moment = require('moment');
moment.locale('th');

const selectStyle ={
    marginLeft:'61px',
    marginBottom:'1rem',
    borderRadius:'0.2rem'
}

class Periodregister extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
      
        this.toggle = this.toggle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = { collapse: true, visible:true};
        this.post = null
    }
    onSubmit(e){
        console.log(e);
     this.props.dispatch(savePeriod(e)).then(()=>{
        
         if(!this.props.periodSave.isRejected){
            this.handleInitialize();
            alertify.alert('เพิ่มการอบรมเรียบรร้อยแล้ว').set('basic', true)
         }else{
            this.setState({ visible: true });
         }
     }).catch((err)=>{
        this.setState({ visible: true });
     })
    }
    handleInitialize() {
        let initData = {
            "per_start": '',
            "per_end":'',
            "per_time_start": '',
            "per_time_end":'',
            "course_id":null,
            "per_price":null,
            "per_quota":null,
            "course_status": 0
        };
        this.props.initialize(initData);
    }
    toggle(){

    }
    onDismiss() {
        this.setState({ visible: false });
      }
    componentDidMount(){
        this.props.dispatch(loadCourse());
        this.props.dispatch(loadRooms());
        
    }

   
render() {
const {periodSave, courses, operation_rooms, handleSubmit} = this.props;
        

return (
         <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                                <i className="fa fa-edit"></i> เปิดการอบรม
                                <div className="card-actions">

                                    <a href="#" className="btn-setting"><i className="icon-settings"></i></a>
                                    <Button className="btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                                    <a href="#" className="btn-close"><i className="icon-close"></i></a>
                                </div>
                            </CardHeader>
                            <Collapse isOpen={this.state.collapse} id="collapseExample">
                            <CardBody>
                                {periodSave.isRejected && <Alert isOpen={this.state.visible} color="danger" toggle={this.onDismiss}>{periodSave.data}</Alert>}
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

                                        <Field name="course_id"  label="หลักสูตร" data={courses.data}  component={renderSelect} />

                                     <FormGroup>
                                        <Field name="per_price" component={renderField}  type="number" label="ค่าใช้จ่ายต่อหัว" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Field name="per_quota" component={renderField}  type="number" label="จำนวนที่นั่ง" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Field name="room_id" data={operation_rooms.data}  component={renderSelectRoom} label="ห้องปฏิบัติการ" />
                                    </FormGroup>
                                <div className="form-actions"> 
                                    <Button  color="secondary">Back</Button>{ ' '}
                                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>Save changes</Button>     
                                </div>
                            </Form>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
        </Row>  
</div>
        );
    }
}


Periodregister.propTypes = {
  
};
const  mapStateToProps = (state)=>({
 courses: state.courseReducer.courses, 
 periodSave: state.periodReducers.periodSave,
 operation_rooms: state.operationRoomReducers.operation_rooms
})
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
const form = reduxForm({
   form: 'Periodregister',
   validate
})


Periodregister = connect(mapStateToProps)(Periodregister)

export default form(Periodregister)
