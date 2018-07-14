import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//HOC (Higher-Order Components)

export default function (ComposedComponent) {
    class AuthenticationAdmin extends Component {
            static contextTypes = {
             router: PropTypes.object
                }
            componentWillMount() {
                console.log(this.props.data)
                    if (this.props.data) {
                        
                    if (this.props.data.permission.include(0)) {
                        this.context.router.push('/');
                                }
                            }
                    }
            componentWillUpdate(nextProps) {
                console.log(this.props.data)
                    if (nextProps.data) {
                    if (nextProps.data.permission.include(0)) {
                        this.context.router.push('/'); 
                                    }
                                }
                            }

            render() {
                return <ComposedComponent {...this.props} />
                }
                }
        function mapStateToProps(state) {
            return {
            authenticated: state.authReducers.authenticated,
            data: state.authReducers.data
                };
            }
    return connect(mapStateToProps)(AuthenticationAdmin);             
    }