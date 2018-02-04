import React, { Component } from 'react';
import {Link} from 'react-router';
class Brand extends Component {
    render() {
       
        return (   
        <div className="navbar-brand">
        <Link to="/">
        <h3>LPRU Information technology conference</h3>
        </Link>
            <button className={"button navbar-burger "+this.props.active} onClick={this.props.toggleClass}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
  
        );
    }
}

export default Brand;
