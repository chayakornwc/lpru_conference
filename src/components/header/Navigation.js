import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Brand from './Brand';
    class Navigation extends Component{
      constructor(props){
        super(props);
        this.state = {
            active:false,
            isOpen:false
        };
     
        }
     
        renderLinks(){
            if(this.props.authentication) {
               if(this.props.data.user_group <=1 ){
                   return[ 
                        <Link to="/Course" className="navbar-item" key={1}>Course</Link>,
                        <Link to="/Logout" className="navbar-item" key={6}>Logout</Link>
                   ]
                }   else{
                       return[
                        <Link to="/statistics" className="navbar-item" key={1}>Statistics</Link>,   
                        <Link to="/pastevents" className="navbar-item" key={2}>Past events</Link>,
                        <Link to="/upcomingevents" className="navbar-item" key={3}>Upcoming events</Link>,
                        <Link to="/User" className="navbar-item" key={4}>Certification</Link>,
                        <Link to="/User" className="navbar-item" key={5}>Profile</Link>,
                        <Link to="/Logout" className="navbar-item" key={6}>Logout</Link>
                       ]
                   }
                
          }else{
                return [
                    <Link to="/Course" className="navbar-item" key={1}>Past events</Link>,
                    <Link to="/Course" className="navbar-item" key={2}>Upcoming events</Link>,
                    <Link to="/Register" className="navbar-item" key={3}>Register</Link>,
                    <Link to="/Login" className="navbar-item" key={4}>Login</Link>
                ]
          }
        }
        render(){
            const active = this.state.active ? 'is-active':'is-passive'; 
            return(
                <nav className="navbar is-primary">
                    <div className="container">        
                    <Brand toggleClass={this.toggleClass} active={active} />
                    <div className={"navbar-menu "+active}>
                    <div className="navbar-end">
                        {this.renderLinks()}
                        </div>
                    </div>
                    </div>
                   
                </nav>
            )
        }
        toggle = () =>{
            this.setState({
                isOpen:!this.this.state.isOpen 
            })
        }

        toggleClass=()=>{   
           this.setState({
               active: !this.state.active
           });
        }
    }

    function mapStateToProps(state){
        return{
            authentication: state.authReducers.authenticated,
            data: state.authReducers.data
        }
    }

    export default connect(mapStateToProps)(Navigation);
