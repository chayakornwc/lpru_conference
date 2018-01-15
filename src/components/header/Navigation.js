import React, {Component} from 'react';
import { Link } from 'react-router'
import Brand from './Brand';
    class Navigation extends Component{
      constructor(props){
        super(props);
        this.state = {
            active:false
        };
      }
        render(){
            const active = this.state.active ? 'is-active':'is-passive'; 
            return(
                <nav className="navbar is-primary">
                    <div className="container">        
                    <Brand toggleClass={this.toggleClass} active={active} />
                    <div className={"navbar-menu "+active}>
                    <div className="navbar-end">
                        <Link to="/Register" className="navbar-item">Register</Link>
                        <Link to="/Login" className="navbar-item">Login</Link>
                        </div>
                    </div>
                    </div>
                   
                </nav>
            )
        }
        toggleClass=()=>{   
           this.setState({
               active: !this.state.active
           });
        }
    }
    export default Navigation;
