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
                    <div class="tile tile is-8 is-vertical md-auto">
                       <div class="tile is-child box">
                            <div class="form-control">
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