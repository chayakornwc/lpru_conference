import React, { Component } from 'react'
import 'moment/locale/th';
import {connect} from 'react-redux';
const moment = require('moment');
moment.locale('th');

const statusTags = (data) =>{

    switch(data){
      case 0 :
      return <span className="tag is-success">เปิดการอบรม</span>
      break;
      case 1:
      return <span className="tag is-warning">กำลังดำเนินการ</span>
      break;
      case 2:
      return <span className="tag is-danger"> ระงับการอบรม </span>
      break;
      case 3:
      return <span className="tag is-info"> เสร็จสิ้น</span>
      break;
      default: 
      return  <span className="tag is-primary">รอการตรวจสอบ</span>
      break;
    }

  }
  const renderButton = (time)=>{
     
      if(moment(time) < moment()){
         return(
           'disabled'
         )
      }
  }

 class CourseList extends Component {
     

     constructor(props){
        super(props);
        
     }
  
  render() {
      const {data, buttonAttends, auth} = this.props;
    console.log(auth)
    
    return (
        <div className="container">
        {data &&data.map(function(e, i){
            return(
                    <div className="box boder" key={i}>
                    <article className="media">
                        <div className="media-left">
                        {statusTags(e.per_status)}
                        </div>
                        <div className="media-content">
                        <div className="content">
                            <div className="columns">
                            <span className="is-tag " style={{paddingTop:"1.5rem"}}><i className="fa fa-graduation-cap" /></span>
                                <div className="column">
                                        <div className="colums">
                                    
                                            <div className="colum is-half">
                                                <span>{e.course_name}</span>
                                            </div>
                                            <div className="colum is-half">
                                                <span>{e.course_nameEng}</span>
                                            </div>
                                    </div>
                                    
                                </div>

                                <div className="column">
                                <div className="colums">
                                        <div className="colum is-half">
                                            <span><i className="fa fa-calendar-alt" />{' '}{moment(e.per_start).add(543, 'years').format('ll')}{' '}<i className="fas fa-long-arrow-alt-right"></i>{' '}{moment(e.per_end).add(543, 'years').format('ll')}</span>
                                        </div>
                                        <div className="colum is-half">
                                            <span><i className="fa fa-clock" />{' '}{moment(e.per_time_start, ['HH:mm:ss', 'HH:mm:ss']).format('HH:mm')}{' '}<i className="fas fa-long-arrow-alt-right"></i>{' '}{moment(e.per_time_end, ['HH:mm:ss', 'HH:mm']).format('HH:mm')}</span>
                                        </div>
                                </div>
                                </div>
                                <div className="column">
                                <div className="colums">
                                    <div className="colum is-half">
                                        <span>
                                            <i className="fas fa-map-marker-alt" />{' '}{e.room_name}
                                        </span>
                                    </div>
                                    <div className="colum is-half">
                                        <span><i className="fa fa-university" ></i>{' '}{e.lecture}</span>
                                    </div>
                                </div>
                                </div>
                            <div className="is-tag">
                                    <span><i className="fa fa-users" />{' '}{e.period_quantity}{' / '}{e.per_quota}</span>
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="media-right" >
                        <div className="colums">
                            <div className="colum is-half">
                              {auth && auth.sub && <button className=" button is-mystyle" disabled={renderButton(e.per_start)} onClick={()=>{buttonAttends(e.per_id, e.course_name)}} >สมัครเลย</button>}  
                            </div>
                            <div className="colum is-half">
                              {auth && auth.sub &&  <a href={"../events/"+e.per_id} className="colum is-primary button is-mystyle" >รายชื่อ</a>}
                            </div>
                        </div>
                        </div>
                    </article>
                </div>  
            )
        })}
               
        </div>
    )
  }
}
function mapStateToProps(state){
    return{
        auth:state.authReducers.data
    }
}
export default connect(mapStateToProps)(CourseList);