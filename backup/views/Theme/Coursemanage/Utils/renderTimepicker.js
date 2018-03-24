import 'rc-time-picker/assets/index.css';
import React from 'react';
import Datepicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form

import {InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
const moment = require('moment');
moment.locale('th');
// let date = moment(dateStr, 'DD/MM/YYYY'); 
// if (date.isValid()) { 
//     date.add(543, 'years'); 
//     return date.format('DD/MM/YYYY'); 
//} 


const renderDatePicker = ({ input, placeholder,  defaultValue, meta: { touched, error } }) => {
   
    return (
                <div>          
                    <InputGroup >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-clock-o"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <TimePicker className="form-control" {...input} value={input.value ? moment(input.value, 'LT') : null} showSecond={false}  />
                    </InputGroup>
                    {/* ส่วนนี้จะแสดงข้อความ error ที่ได้จากการ validate */}
                    {touched && error && <small className="text-danger">{error}</small>}
                </div>
                    )
    }
 


export default renderDatePicker;    