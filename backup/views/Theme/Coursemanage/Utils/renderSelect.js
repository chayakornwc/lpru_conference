import React from 'react';
import { FormGroup, Col, Label, Input } from 'reactstrap';

 
const renderSelect = ({ input, label, type, textarea, autoFocus,data, meta: { touched, error } })  => {
    return(
            <div>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor={input.name}>{label}</Label>
                    </Col>
                    <Col xs="12" md="4">              
                        <select {...input} className="form-control">
                            <option >กรุณาเลือก</option> 
                                {data && data.map((value, key) =>(
                                <option key={key} value={value.course_id} >{value.course_name} {' ('+value.course_nameEng+')'}</option>
                                    ))}
                        </select>
                        {touched && error && <span className="text-danger">{error}</span>}
                    </Col>        
                </FormGroup>
            </div>
    )
    }
 


export default renderSelect;
  

