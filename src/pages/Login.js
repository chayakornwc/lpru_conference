import React, { Component } from 'react';
import Logon from '../components/Logon';
import {connect} from 'react-redux';
import Whitebrand from '../components/brand/whitebrand';
import PropTypes from 'prop-types'
class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
        }
    render() {
        const {auth} = this.props
        return (
        <div>
                <div className="forest">
                <div className="brand md-auto" style={{width:'200px'}}>
                <Whitebrand />
                </div>
                    <div className="tile tile is-8 is-vertical md-auto">
                       <div className="tile is-child box">
                            <div className="form-control">
                                <Logon />
                              
                             </div>
                        </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps)(Login);


function mapStateToProps(state){
    return{
        auth:state.authReducers.authentificated,
    }
}