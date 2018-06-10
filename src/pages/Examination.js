import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {getPeriod} from '../redux/actions/periodActions';
import {getExamination, saveExamination} from '../redux/actions/examinationActions';
import WizardFormFirstPage from '../components/Examination/WizardFormFirstPage';
import WizardFormSecondPage from '../components/Examination/WizardFormSecondsPage';



class Examination extends Component {

  constructor(props){
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }

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
       })}
    })
  }
  componentWillMount(){
    
  }
  handleSubmit = (values)=>{
    this.props.dispatch(saveExamination(values)).then(()=>{
    })
  }
  render() {
    const {period,examinations, auth} = this.props
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
              <header>การสอบ</header>
            </div>
            <div className="card-content">
            {page === 1 && <WizardFormFirstPage data={period.data} countExam={examinations&& examinations.data &&  examinations.data.CountOfexam} onSubmit={this.nextPage}/>}
            {page === 2 && <WizardFormSecondPage examinations={examinations&& examinations.data && examinations.data.members} information={information && information.data && information.data.sub && information.data.per_id && information.data.course_id && information.data} previousPage={this.previousPage} onSubmit={this.handleSubmit}/>}
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
     examinations:state.examinationReducers.examinations
  }
}
Examination = connect(mapStateToProps)(Examination);
export default form(Examination); 