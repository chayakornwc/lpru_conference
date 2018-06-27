import React, { Component } from 'react';
import {loadPeriods} from '../redux/actions/periodActions';
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

class Course extends Component {
    constructor(props){
        super(props);
    }
  
    componentDidMount(){
        return this.props.dispatch(loadPeriods()).then(()=>{
            
        })
    }
    attends = (id, information='')=>{
     const  data = {
            id:id,
            registration_id:this.props.auth.sub
        }
        
        confirmModalDialog({
            show: true,
            type:'info',
            title: 'ยืนยันการสมัคร',
            message: 'คุณต้องการสมัครหลักสูตร : '+information+' ใช่หรือไม่',
            confirmLabel: 'ใช่!!', 
            onConfirm : ()=>{
               return this.props.dispatch(Attends(data)).then(()=>{
                   console.log(this.props.attendsSave)
                   if(!this.props.attendsSave.isRejected){
                       this.props.dispatch(loadPeriods());
                        alertify.success(this.props.attendsSave.data.message)
                   }else{
                        this.props.dispatch(loadPeriods());
                        alertify.error(this.props.attendsSave.data.message)
                   }
               })
            }
        })
    }
    handleSearch = (term)=>{
       return this.props.dispatch(loadPeriods(true, term)).then(()=>{

       }) //true = upcoming events arguments();

    }

  render() {
    const filter = debounce(term => { this.handleSearch(term) }, 500);

    const  {periods} = this.props
    
        if(periods.isRejected){
       return <div className="notification is-danger">
            <h1>{periods.data}</h1>
        </div>
        }
    return (
        <div>
            <div className="container" style={{paddingTop:'1rem'}}>
             <Filter 
             title="การอบรมที่กำลังจะเกิดขึ้น (Upcoming events)"
             placeholder="ค้นหา เช่น ชื่อหลักสูตร วิทยากร"
             onSearchTermChange={filter}
                />
             </div>
      <div className="container " style={{paddingTop:'1rem'}}>
     
        {periods.isLoading && 
            <div className="columns  is-centered">
                <Loader />
            </div>}
            {!periods.isLoading && <CourseList 
            buttonAttends={this.attends} 
            data={periods.data}
           
            />}
            
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
export default  connect(mapStateToProps)(Course);