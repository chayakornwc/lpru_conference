import React, { Component } from 'react'

import {loadPeriods} from '../redux/actions/periodActions.js';
import {connect} from 'react-redux'
import Loader from '../components/Utils/loader';
import   'moment/locale/th';
import CourseList from '../components/course/CourseList.js';
const moment = require('moment')
moment.locale('th')

class Course extends Component {
    constructor(props){
        super(props);
    }
  
    componentDidMount(){
        return this.props.dispatch(loadPeriods()).then(()=>{
            
        })
    }
    attends = (id)=>{
        
    }
  render() {
  

    const  {periods} = this.props
    
        if(periods.isRejected){
       return <div className="notification is-danger">
            <h1>{periods.data}</h1>
        </div>
        }
    return (
      <div className="container " style={{paddingTop:'1rem'}}>
        {periods.isLoading && 
            <div className="columns  is-centered">
                <Loader />
            </div>}
            {!periods.isLoading && <CourseList buttonAttends={this.attends} data={periods.data} />}
            
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