import React, { Component } from 'react'

import {loadPeriods} from '../redux/actions/periodActions.js';
import {connect} from 'react-redux'
import Loader from '../components/Utils/loader';
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
        if(periods.isRejected){
       return <div class="notification is-danger">
            <h1>{periods.data}</h1>
        </div>
        }
    return (
      <div className="containter ">
        {periods.isLoading && 
            <div className="columns  is-centered">
                <Loader />
            </div>}
            {!periods.isLoading &&<div>
                <div className="box boder">
                <article class="media">
                    <div class="media-left">
                    <span class="tag is-danger">ปิดการอบรม</span>

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