import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {getPeriod} from '../redux/actions/periodActions';
import {getExamination} from '../redux/actions/examinationActions';
import WizardFormFirstPage from '../components/Examination/WizardFormFirstPage';
import WizardFormSecondPage from '../components/Examination/WizardFormSecondsPage';
import WizardFormThirdPage from '../components/Examination/WizardFormThirdPage';
import { ENGINE_METHOD_NONE } from 'constants';

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
  render() {
    const {period,examinations} = this.props
    const { page } = this.state
    //set data to chrilden props
    return (
    <div className="container" style={{paddingTop:'1rem'}}>
      <div className="card">
            <div className="card-header">
              <header>การสอบ</header>
            </div>
            <div className="card-content">
            {page === 1 && <WizardFormFirstPage data={period.data} countExam={examinations&& examinations.data &&  examinations.data.CountOfexam} onSubmit={this.nextPage}/>}
            {page === 2 && <WizardFormSecondPage examinations={examinations&& examinations.data && examinations.data.members} previousPage={this.previousPage} onSubmit={this.nextPage}/>}
            {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={this.nextPage}/>}
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