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
                        <Link to="/pastevents" className="navbar-item" key={2}>การอบรมที่ผ่านมาแล้ว</Link>,
                        <Link to="/upcomingevents" className="navbar-item" key={3}>การอบรมเร็วๆนี้</Link>,
                        <Link to="/Profile" className="navbar-item" key={5}>โปรไฟล์</Link>,
                        <Link to="/Logout" className="navbar-item" key={6}>ลงชื่อออก</Link>
          }else{
                return [
                    <Link to="/signin" className="navbar-item" key={1}>ลงชื่อเข้าใช้</Link>,
                    <Link to="/pastevents" className="navbar-item" key={2}>การอบรมที่ผ่านมาแล้ว</Link>,
                    <Link to="/upcomingevents" className="navbar-item" key={3}>การอบรมเร็วๆนี้</Link>,
                    <Link to="/Register" className="navbar-item" key={7}>ลงทะเบียนสมาชิก</Link>
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
