import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {age:0};
    }
render() {
return (
    <div>
    <h3>You age:{this.props.params.id} </h3>
   
    </div>
    );       
    }
}
function mapDispatchToProps(dispatch) {
    return {
    increteAge: () => {
    dispatch({type: 'INCREMENT'})
    },
    decreteAge: () => {
    dispatch({type: 'DECREMENT'})
    }
    }
    }
function mapStateToProps(state) {
    return {
       // age: state.countAge,
        //firstname: state.firstname
      age:  state.countAge
    } 
    console.log(state.countAge);
 }

export default connect(mapStateToProps, mapDispatchToProps)(Home)