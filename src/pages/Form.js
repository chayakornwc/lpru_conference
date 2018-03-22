import React, { Component } from 'react';
import {connect} from 'react-redux';
const alertify = require('alertify.js');
class Form extends Component {
    constructor(props){
        super(props);
            this.state ={
                email : null,
                password: null
            }
        
    }
   

    
    handleChange = name => event => {
       console.log(event.target.value)
      
        this.setState({
          [name]: event.target.value,
        });   
        
          switch (name){
              case 'Email' : this.props.setEmail(event.target.value) 
          }
        
    }
    render() {
        
        const {Email} = this.props;
       
        return (
            <div>
        <div className="field">
            <p className="control has-icons-left has-icons-right">
                <input className="input" onChange={this.handleChange('Email')}  type="email" placeholder="Email" />
                <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
                </span>
            </p>
            </div>
            <div className="field">
            <p className="control has-icons-left">
                <input className="input" type="password" onChange={this.handleChange('password')} placeholder="Password" />
                <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
                </span>
            </p>
            </div>
                            <div className="field is-grouped">
                <div className="control">
                    <button type="button" onClick={this} className="button is-link">Preview</button>
                </div>
                <div className="control">
                    <button onClick={this.clear} className="button is-text">Cancel</button>
                </div>
                </div>
        <h5>DATA : IS {Email}</h5>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      setEmail: (email) => {
          dispatch({type: 'SETDATA',payload: email});
      }
    }
    }
  function mapStateToProps(state) {
    return {
        Email: state.email
       
    }
   
    }
  export default connect(mapStateToProps, mapDispatchToProps)(Form)