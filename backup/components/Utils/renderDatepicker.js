import React from 'react';
import Datepicker from 'react-datepicker';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
import 'react-datepicker/dist/react-datepicker.css';
import './extends.css';
import {InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
const moment = require('moment');
moment.locale('th');
moment().format('LL');
// let date = moment(dateStr, 'DD/MM/YYYY'); 
// if (date.isValid()) { 
//     date.add(543, 'years'); 
//     return date.format('DD/MM/YYYY'); 
//} 

function thaiDate (dateStr){
    let date = moment(dateStr, 'DD MMMM YYYY');
    
    if(date.isValid()){
        date.add(543, 'years');
        return date.format('DD MMMM YYYY')
    }
}
const renderDatePicker = ({ input, placeholder,  defaultValue, meta: { touched, error } }) => {
   
    return (
                <div>          
                    <InputGroup >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-calendar"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                            <Datepicker {...input} style={{"width":"100%"}} placeholderText={placeholder}  className="form-control"  minDate={moment().add(543,'years')}  dateFormat='LL' selected={input.value ? moment(input.value, 'DD MMMM YYYY')  : null} />
                    </InputGroup>
                    {/* ส่วนนี้จะแสดงข้อความ error ที่ได้จากการ validate */}
                    {touched && error && <small className="text-danger">{error}</small>}
                </div>
                    )
    }
 


export default renderDatePicker;