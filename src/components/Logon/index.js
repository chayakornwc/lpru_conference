import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signin} from '../../redux/actions/authActions';
const alertify = require('alertify.js');

class Logon extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:null,
            password:null,
            Login:false
        }
    }
    render() {
        const {handleSubmit} = this.props;
     
        return (
        <div> 
         
            <div className="field" >
                <header className="panel-header">
                    <p className="panel-heading">
                    Information technology  conference Login.
                    </p>
                </header>
                {this.renderAlert()}
            <label id="username" className="label">Username</label>
                <p className="control has-icons-left has-icons-right">
                    <input aria-labelledby="username" onChange={this.handleChang('username')} className="input" type="text" name="username" placeholder="Username" />
                    <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                    </span>
               </p>
                </div>
                <div className="field">
                <label id="password" className="label">Password</label>
                <p className="control has-icons-left">
                    <input id="password" aria-labelledby="password" onChange={this.handleChang('password')} className="input" type="password" name="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                
                <div className="field">
                <p className="control">
                    <button onClick={this.handleSubmit} className="button is-success">
                    Login
                    </button>
                </p>
            </div>
       
        </div>
        );
    }
    handleChang = name => event =>{
            this.setState({
              [name]: event.target.value,
            });               
    }
    handleSubmit = ()=>{
        const LoginData = {
            username: this.state.username,
            password: this.state.password
           }
           this.props.SetLogin(LoginData);
    

    }
    renderAlert(){
        if(this.props.errorMessage){    
           return(
            <div className="notification is-danger">    
            <strong>Warning: </strong>{this.props.errorMessage}
          </div>
        )
        }
    }
    Refund(){
        return false
    }
}
//<button onclick={this.Refund} className="delete"></button>
// function validate(values){
  
//     const errors ={};
//    if(!values.username){
//        errors.username = 'จำเป็นต้องกรอก username';
//        alertify.error( errors.username)
       
//    }else if(!values.password){
//        errors.password = 'จำเป็นต้องกรอก password';
//        alertify.error( errors.password)
//    }else{
     
//    }
// }
function mapDispatchToProps(dispatch) {
    return {
      SetLogin: (data) => {
         dispatch(signin(data));
      }
    }
    }

function mapStateToProps(state){
    return{
      //  setTimeout(function() { this.setState({position: 1}); }.bind(this), 3000);
        errorMessage:state.authReducers.error // กรณี login ไม่ผ่าน
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logon);
    