import React from 'react';
import { FormGroup, Col, Label, Input } from 'reactstrap';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
 
const renderSelectRoom = ({ input, label, type, data, autoFocus, meta: { touched, error } }) => {

    return (
                <div>
                    <FormGroup row>
                    <Col md="3">
                    <Label htmlFor={input.name}>{label}</Label>
                    </Col>
                    <Col xs="12" md="4">              
                    <select {...input}  type="select" className="form-control" >
                    {data && data.map(value =>(
                        <option key={value.id} value={value.id}>{value.name}</option>
                    ))
                    }
                  
                    </select> 
                     {touched && error && <small className="text-danger">{error}</small>}
                    </Col>        
                    </FormGroup>
                    </div>
                
                    )
    }
 


export default renderSelectRoom;
  
// <FormGroup row>
// <Col md="3">
//   <Label htmlFor="text-input">Text Input</Label>
// </Col>
// <Col xs="12" md="9">
//   <Input type="text" id="text-input" name="text-input" placeholder="Text"/>
//   <FormText color="muted">This is a help text</FormText>
// </Col>
// </FormGroup>