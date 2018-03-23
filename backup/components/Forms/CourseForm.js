import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
  } from 'reactstrap';
import renderField from '../Utils/renderFields';
import { Field, reduxForm } from 'redux-form';


class CourseForm extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
      componentDidMount(){
          alertify.success('success loading')
      }
    render() {
        return (
    <div>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-edit"></i>Form Elements
                <div className="card-actions">
                  <a href="#" className="btn-setting"><i className="icon-settings"></i></a>
                  <Button className="btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                  <a href="#" className="btn-close"><i className="icon-close"></i></a>
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} id="collapseExample">
                <CardBody>
                <Form className="form-horizontal">
                  <FormGroup>
                  <Field name="Course_name" component={renderField}  type="text" label="ชื่อ" autoFocus />
                  </FormGroup>
                  <FormGroup>
                     <Field name="first_name" component={renderField}  type="text" label="ชื่อ" autoFocus />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedPrependedInput">Append and prepend</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <Input id="appendedPrependedInput" size="16" type="text"/>
                        <InputGroupAddon addonType="append">
                          <InputGroupText>.00</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInputButton">Append with button</Label>
                    <div className="controls">
                      <InputGroup>
                        <Input id="appendedInputButton" size="16" type="text"/>
                        <InputGroupAddon addonType="append">
                          <Button color="secondary">Go!</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="appendedInputButtons">Two-button append</Label>
                    <div className="controls">
                      <InputGroup>
                        <Input id="appendedInputButtons" size="16" type="text"/>
                        <InputGroupAddon addonType="append">
                          <Button color="secondary">Search</Button>
                          <Button color="secondary">Options</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" color="primary">Save changes</Button>
                    <Button color="secondary">Cancel</Button>
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
function validate(values){
    errors ={};
    return errors; 
}
const form = reduxForm({
    form: 'CourseForm',
    validate
})

export default form(CourseForm);