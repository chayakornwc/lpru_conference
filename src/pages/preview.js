import React, { Component } from 'react';
import { connect } from 'react-redux';

class Preview extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      setfirstname: (dt) => {
          dispatch({type: 'SET_FIRSTNAME',payload:dt});
      }
    }
    }
  function mapStateToProps(state) {
    return {
        firstname: state.firstname
    }
    }
  export default connect(mapStateToProps, mapDispatchToProps)(Preview)