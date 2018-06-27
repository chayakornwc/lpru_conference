import React, { Component } from 'react';
import Logon from '../components/Logon';
import Whitebrand from '../components/brand/whitebrand';

class Login extends Component {
    render() {
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

export default Login;