import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { Redirect } from "react-router-dom";
export default function(ComposedComponent){

    class Authentication extends Component {
        static contextTypes = {
        router: PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.history.push('/login');
            }
            console.log(this.props.authenticated)
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.history.push('/login');
            }
        }

        render(){
            // รูปแบบการทำเป็น HOC เราจะต้องเอา ส่ง ComposedComponent กลับไป
            // พร้อม props เดิมของ component นั้นๆ ด้วย
            return <ComposedComponent {...this.props} />
        }
    }
//map  authReducers
    function mapStateToProps(state){
        return{
            authenticated: state.authReducers.authenticated
        };
    }
    
    return connect(mapStateToProps)(Authentication);

}
