import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {getPeriod} from '../redux/actions/periodActions';
import {getExamination, saveExamination,examinationChecker} from '../redux/actions/examinationActions';
import WizardFormFirstPage from '../components/Examination/WizardFormFirstPage';
import WizardFormSecondPage from '../components/Examination/WizardFormSecondsPage';
import WizardFormThirdPage  from '../components/Examination/WizardFormThirdPage';
import {saveSurvey} from '../redux/actions/surveyActions';
import survey from '../data/survey';

const alertify = require('alertify.js');


class Examination extends Component {

  constructor(props){
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1,
     
    }
  }
  static contextTypes = {
    router: PropTypes.object
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }
  componentDidMount(){
  return  this.props.dispatch(getPeriod(this.props.params.id)).then(()=>{
       {this.props.period.data && this.props.dispatch(getExamination(this.props.period.data.course_id)).then(()=>{
        const forchecker = {
          per_id:this.props.period.data.per_id,
          sub:this.props.auth.sub
        }
        this.props.dispatch(examinationChecker(forchecker)).then(()=>{
            if(!this.props.examUserCheck.isRejected){
                  if(this.props.examUserCheck.data.state == 'done'){
                    this.setState({
                      page:3
                    })
                  }
            }
        })
       })}
    })
  
  }
  handleSubmit = (values)=>{
    this.props.dispatch(saveExamination(values)).then(()=>{
      if(!this.props.examinationsSave.isRejected){
          this.nextPage();
      }else{
        this.nextPage();
        alertify.alert(this.props.examinationsSave.data);
      }
    })
  }
  handleSurveySubmit = (values)=>{
    const Data = {
      per_id:this.props.period.data.per_id,
      gender:this.props.auth.gender,
      sub:this.props.auth.sub,
      values:values
    }
    return this.props.dispatch(saveSurvey(Data)).then(()=>{
     if(!this.props.surveySave.isRejected){
        alertify.alert(this.props.surveySave.data.message)
        this.context.router.push(`/profile/`)
     }
    })
  }
  render() {
    const {period,examinations, auth, examUserCheck} = this.props
    const { page } = this.state
    const information = {
      data:{
        sub:auth.sub,
        per_id:period.data && period.data.per_id,
        course_id:period.data&&period.data.course_id
      }
    }
   
    //set data to chrilden props
    return (
    <div className="container" style={{paddingTop:'1rem'}}>
      <div className="card">
            <div className="card-header">
              <header>{page===1 && 'คำอธิบาย'}{page===2 && 'การสอบ'}{page===3 && 'การประเมิณผลหลังอบรม'}</header>
            </div>
            <div className="card-content">
            {page === 1 && <WizardFormFirstPage data={period.data} countExam={examinations&& examinations.data &&  examinations.data.CountOfexam} onSubmit={this.nextPage}/>}
            {page === 2 && <WizardFormSecondPage examinations={examinations&& examinations.data && examinations.data.members} information={information && information.data && information.data.sub && information.data.per_id && information.data.course_id && information.data} previousPage={this.previousPage} onSubmit={this.handleSubmit}/>}
            {page === 3 && <WizardFormThirdPage period={period.data} data={survey} onSubmit={this.handleSurveySubmit} />}
            </div>
        </div>
        </div>
    )
  }
}
const form = reduxForm({
  form: 'Examination',
 
})

function mapStateToProps(state){
  return{
     auth:state.authReducers.data,
     userSave:state.userReducers.userSave,
     period:state.periodReducers.period,
     examinations:state.examinationReducers.examinations,
     examinationsSave:state.examinationReducers.examinationsSave,
     examUserCheck:state.examinationReducers.examUserCheck,
     surveySave:state.surveyReducers.surveySave
  }
}
Examination = connect(mapStateToProps)(Examination);
export default form(Examination); 