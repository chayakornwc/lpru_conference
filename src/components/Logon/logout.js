import React, { Component } from 'react';

import { connect } from 'react-redux';
import {signout} from '../../redux/actions/authActions';

class Logout extends Component {

    componentWillMount(){
        this.props.dispatch(signout())      
    }
    render() {
        return (
        <div>Signout Complete See You Again</div>
        )
        }
}



export default connect()(Logout);