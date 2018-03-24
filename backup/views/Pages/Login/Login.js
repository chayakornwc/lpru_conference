import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert} from 'reactstrap';
import Whitebrand from '../../../brand/whitebrand';
import {signin} from '../../../redux/actions/authActions';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderInput from '../../../components/Utils/renderInputs';
import {Redirect} from 'react-router-dom';
class Login extends Component {
  constructor(props){
    super(props)
    //this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    visible:true
  }
  onSubmit = (values) =>{
    this.props.dispatch(signin(values));
  }
  componentWillMount(){
   
  }
  componentDidUpdate(){
  console.log('didUpdate') 
  }
  render() {
    const  {signin, handleSubmit} = this.props;
    if(this.props.Auth){
      return( <Redirect
        to={{
          pathname: "/dashboard",
          state: { from: this.props.location }
        }}
      />)
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>ยินดีต้อนรับเข้าสู่ระบบ</h1>
                    <p className="text-muted">กรุณาลงชื่อเข้าใช้</p>
                    {this.renderAlert()}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field  name="username" component={renderInput}  type="text" placeholder="Username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>         
                        </InputGroupText>
                      </InputGroupAddon>
                      <Field name="password" component={renderInput} type="password" placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" onClick={handleSubmit(this.onSubmit)} className="px-4">เข้าสู่ระบบ</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>ระบบการจัดการอบรม</h2>
                      <h5>สารสนเทศการอบรม มหาวิทยาลัยราชภัฏลำปาง </h5>
                      <div>
                      <Whitebrand styles={{width:'200px', margin:'0 auto',}} />
                      <h6>วิทยาการ ปีการศึกษา 2561</h6>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  onDismiss=()=>{
    this.setState({
      visible:!this.state.visible
    })
  }
   renderAlert(){
      if(this.props.messageError){
        return(
                <div>
                   <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>{this.props.messageError}</Alert>
                </div>
          )
      }
  }
}


function validate(values) {
  const errors = {};
  if (!values.username) {
      errors.username = 'จำเป็นต้องกรอกฟิลด์นี้';
  }
  if(!values.password){
      errors.password = 'จำเป็นต้องกรอกฟิลด์นี้'
  }
  

  return errors;
}

const form = reduxForm({
  form: 'Login',
  validate 
})
const mapStateToProps = (state) => ({
  messageError:state.authReducers.error,
  Auth:state.authReducers.data
});
Login = connect(mapStateToProps)(Login);
export default form(Login);
