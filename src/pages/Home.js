import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);
       // this.state = {age:0};
    }
render() {
return (
    <div>
    <h3>You age:{this.props.age} </h3>
    <button className="button" onClick={this.props.increteAge}>Age plus</button>
    <button className="button" onClick={this.props.decreteAge}>Age times</button>
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