import React from 'react';
import { FormGroup } from 'reactstrap';
import Select from 'react-select';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderSelect = ({ input, label, type, textarea, autoFocus, meta: { touched, error } }) => {
//สำหรับรูปแบบ Field ที่เป็น TextArea

//สำหรับรูปแบบ Field ที่เป็น TextBox

    return (
                <div>
                    <FormGroup row>
                    <Col md="3">
                    <Label htmlFor={input.name}>{label}</Label>
                    </Col>
                    <Col xs="12" md="4">              
                    <Select  type="select" id={input.name}>
                    {data && data.map(value =>(
                        <option value={value.id}>{value.label}</option>
                    ))
                    }
                  
                    </Select> 
                     {touched && error && <small className="text-danger">{error}</small>}
                    </Col>        
                    </FormGroup>
                    </div>
                
                    )
    }
 


export default renderSelect;
  
// <FormGroup row>
// <Col md="3">
//   <Label htmlFor="text-input">Text Input</Label>
// </Col>
// <Col xs="12" md="9">
//   <Input type="text" id="text-input" name="text-input" placeholder="Text"/>
//   <FormText color="muted">This is a help text</FormText>
// </Col>
// </FormGroup>