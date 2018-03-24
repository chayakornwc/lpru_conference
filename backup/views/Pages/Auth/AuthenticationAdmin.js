import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//HOC (Higher-Order Components)
import { Redirect } from "react-router-dom";
export default function (ComposedComponent) {
    class AuthenticationAdmin extends Component {
            static contextTypes = {
             router: PropTypes.object
                }
            componentWillMount() {
                    if (this.props.data) {
                    if (this.props.data.user_group <= 1) {
                        this.context.router.history.push('/dashboard');
                                }
                            }
                    }
                componentWillUpdate(nextProps) {
                    if (nextProps.data) {
                            if (nextProps.data.user_group <= 1) {
                                this.context.router.history.push('/dasboard');
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