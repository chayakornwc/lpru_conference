import React, { Component } from 'react'

import {loadPeriods} from '../redux/actions/periodActions.js';
import {connect} from 'react-redux'
import Loader from '../components/Utils/loader';
import   'moment/locale/th';
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
  render() {
  

    const  {periods} = this.props
    console.log(periods.data);
    
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
            {!periods.isLoading &&<div className="container">
                <div className="box boder">
                <article className="media">
                    <div className="media-left">
                    <span className="tag is-danger">ปิดการอบรม</span>

                    </div>
                    <div className="media-content">
                    <div className="content">
                        <div className="columns">
                        <span className="is-tag " style={{paddingTop:"1.5rem"}}><i className="fa fa-graduation-cap" /></span>
                            <div className="column">
                                    <div className="colums">
                                   
                                        <div className="colum is-half">
                                            <span>{periods.data[0].course_name}</span>
                                        </div>
                                        <div className="colum is-half">
                                            <span>{periods.data[0].course_nameEng}</span>
                                        </div>
                                   </div>
                                
                            </div>

                            <div className="column">
                               <div className="colums">
                                    <div className="colum is-half">
                                        <span><i className="fa fa-calendar-alt" />{' '}{moment(periods.data[0].per_start).add(543, 'years').format('ll')}{' '}<i className="fas fa-long-arrow-alt-right"></i>{' '}{moment(periods.data[0].per_end).add(543, 'years').format('ll')}</span>
                                    </div>
                                    <div className="colum is-half">
                                        <span><i className="fa fa-clock" />{' '}{moment(periods.data[0].per_time_start, ['HH:mm:ss', 'HH:mm:ss']).format('HH:mm')}{' '}<i className="fas fa-long-arrow-alt-right"></i>{' '}{moment(periods.data[0].per_time_end, ['HH:mm:ss', 'HH:mm']).format('HH:mm')}</span>
                                    
                                    </div>
                               </div>
                            </div>
                            <div className="column">
                              <div className="colums">
                                <div className="colum is-half">
                                    <span>
                                        <i className="fas fa-map-marker-alt" />{' '}{periods.data[0].room_name}
                                    </span>
                                </div>
                                <div className="colum is-half">
                                    <span><i className="far fa-user-graduate" />...</span>
                                </div>
                              </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="media-right">
                    <a className="button is-mystyle">สมัครเลย</a>
                    </div>
                </article>
            </div>  
            <div className="box boder">
                <article className="media">
                    <div className="media-left">
                    <span className="tag is-warning">การอบรมเสร็จสิ้น</span>

                    </div>
                    <div className="media-content">
                    <div className="content">
                       
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                       
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                        
                    </div>
                    </div>
                </article>
            </div>  
            <div className="box boder">
                <article className="media">
                    <div className="media-left">
                    <span className="tag is-success">เปิดรับสมัคร</span>

                    </div>
                    <div className="media-content">
                    <div className="content">
                       
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                       
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                        
                    </div>
                    </div>
                </article>
            </div>      
        </div>}
            
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