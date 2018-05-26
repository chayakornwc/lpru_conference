import React, { Component } from 'react'
import "primer-navigation/index.scss";
import {loadPeriods} from '../redux/actions/periodActions.js';
import {connect} from 'react-redux'
class Course extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        return this.props.dispatch(loadPeriods()).then(()=>{
            console.log(this.props.periods)
        })
    }
  render() {
    return (
      <div className="semi-root">
        
      </div>
    )
  }
}
function mapStateToProps(state){
    return{
        periods:state.periodReducers.periods
    }
}
export default  connect(mapStateToProps)(Course);