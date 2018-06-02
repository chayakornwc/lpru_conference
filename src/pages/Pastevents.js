import React, { Component } from 'react'

import {loadPastEvens} from '../redux/actions/periodActions';
import {Attends} from '../redux/actions/courseOrderActions';
import {connect} from 'react-redux'
import Loader from '../components/Utils/loader';
import   'moment/locale/th';
import CourseList from '../components/course/CourseList';
import { debounce } from 'lodash';
import { confirmModalDialog } from '../components/Utils/reactConfirmModalDialog';
import Filter from '../components/course/Filter'
const alertify = require('alertify.js');
const moment = require('moment');

moment.locale('th')

class Pastevents extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount (){
    return this.props.dispatch(loadPastEvens()).then(()=>{
        
    })
}
handleSearch = (term)=>{
  return this.props.dispatch(loadPastEvens(term)).then(()=>{

  }) 
}
  render() {
     const filter = debounce((term) => { 
       this.handleSearch(term) 
      }, 500);
    const  {periods} = this.props
    return (
      <div className="container">
          <div className="container" style={{padding:"1.25rem"}}>
          <Filter 
             title="รายการอบรมที่ผ่านมา (Past events)"
             placeholder="ค้นหา เช่น ชื่อหลักสูตร วิทยากร"
             onSearchTermChange={filter}
                />
            {periods.isLoading && 
            <div className="columns  is-centered">
                <Loader />
            </div>}
            {!periods.isLoading && 
            <div style={{paddingTop:'1.25rem'}}>
            <CourseList 
            buttonAttends={this.attends} 
            data={periods.data}
           
            />
            </div>}
            </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
      periods:state.periodReducers.periods,
      auth:state.authReducers.data,
      attendsSave:state.courseorderReducers.attendsSave
  }
}
export default connect(mapStateToProps)(Pastevents);