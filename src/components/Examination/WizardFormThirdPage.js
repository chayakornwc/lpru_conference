import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import  renderRadioSurvey from './renderRadioSurvey';
import   'moment/locale/th';  
const moment = require('moment');
moment.locale('th')

 const WizardFormThirdPage = (props) => {
  
    const {data , handleSubmit, period} = props
    const onSubmit = (values)=>{
      props.onSubmit(values);
    }
    return (
  
      <div>
        <div className="card-header">
            <div className="columns is-multiline">        
                <div className="column is-12">
                หลักสูตร{period.course_name} 
                </div>
               
                <div className="column is-12">
                อบรมวันที่ระหว่างวันที่ {moment(period.per_start).add(543, 'years').format('ll')}{' '}ถึง{' '}{moment(period.per_end).add(543, 'years').format('ll')}
                </div>
            </div>
           
          </div>
         <form>
           <table className="table">
              <thead>
                <tr>
                  <th colSpan="7">สำหรับการประเมิณหลักสูตร</th>
                </tr>
                <tr>
                  <th width="5%">ข้อ</th>
                  <th width="70%">เรื่อง</th>
                  <th width="5%">1</th>
                  <th width="5%">2</th>
                  <th width="5%">3</th>
                  <th width="5%">4</th>
                  <th width="5%">5</th>
                </tr>
                </thead>
           
           <tbody>
        {data && data.course.map(function(e,i){
          return ( 
           <tr key={i}>
              <td style={{textAlign:'left'}}>{(i+1)}</td>
              <td style={{textAlign:'left'}}>{e.title}</td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="1" name={e.title+','+e.id}  type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="2" name={e.title+','+e.id}  type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="3" name={e.title+','+e.id}  type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="4" name={e.title+','+e.id} type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="5" name={e.title+','+e.id}  type="radio"/></td>
           </tr>
          )
        })}
        </tbody>
        </table>
        <table className="table">
              <thead>
                <tr>
                  <th colSpan="7">สำหรับประเมิณวิทยากร</th>
                </tr>
                <tr>
                  <th width="5%">ข้อ</th>
                  <th width="70%">เรื่อง</th>
                  <th width="5%">1</th>
                  <th width="5%">2</th>
                  <th width="5%">3</th>
                  <th width="5%">4</th>
                  <th width="5%">5</th>
                </tr>
                </thead>
           
           <tbody>
        {data && data.lecture.map(function(e,i){
          return ( 
           <tr key={i}>
              <td style={{textAlign:'left'}}>{(i+1)}</td>
              <td style={{textAlign:'left'}}>{e.title}</td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="1" name={e.title+','+e.id} type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="2" name={e.title+','+e.id}  type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="3" name={e.title+','+e.id} type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="4" name={e.title+','+e.id}  type="radio"/></td>
              <td style={{textAlign:'center'}}><Field component={renderRadioSurvey} value="5" name={e.title+','+e.id} type="radio"/></td>
           </tr>
          )
        })}
        </tbody>
        </table>
        {' '}
        <button type="button" onClick={handleSubmit(onSubmit)} className="button is-primary">ส่งแบบสอบถาม</button>
    </form>
        <div className="card-footer" style={{marginTop:'1rem'}}>
          <span>
          หมายเหตุ
          ระดับความพึงพอใจ 5=มากที่สุด  4=มาก  3=ปานกลาง  2=พอใจ 1=ไม่พอใจ
            </span>
        </div>
      </div>
    )
  
}
const form = reduxForm({
  form: 'WizardFormThirdPage',

})

export default form(WizardFormThirdPage);