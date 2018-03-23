import React, {Component} from 'react';

import {
   Badge, Row, Col, Card, CardHeader, CardBody, Table, Pagination, PaginationItem, PaginationLink, ModalHeader, Modal
} from 'reactstrap';

import {connect} from 'react-redux'
import { loadCourse, getCourse, saveCourse,deleteCourse, resetStatus } from '../../../redux/actions/courseActions';
import { confirmModalDialog } from '../../../components/Utils/reactConfirmModalDialog';
import CourseTable from '../../../components/course/CourseTable';
import CourseForm from '../../../components/course/CourseForm';

const alertify = require('alertify.js');


class Coursemanage extends Component {
  // initatil state 
  state = {  
    modal:false,
    modalTitle:''
    }
    
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalToggle = this.modalToggle.bind(this);

  }
 
    componentDidMount(){
       this.props.dispatch(loadCourse())
      
    }
  
    modalToggle(){
      this.setState({
        modal:!this.state.modal
      })
    }
   
  render() {
   
    const {course, courses, courseDelete, courseSave} = this.props

      if(courses.isRejected){
        return<div>{courses.data}</div>
      }
      
    
    return (
      <div className="animated fadeIn"> 
        <CourseTable data={courses.data} buttonEdit={this.handleEdit} buttonDelete={this.handleDelete} />

        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className="modal-primary" autoFocus={false}  >
          <ModalHeader toggle={this.modalToggle}>แก้ไขหลักสูตร</ModalHeader>
                    {/* เรียกใช้งาน Component UserForm และส่ง props ไปด้วย 4 ตัว */}
                    <CourseForm  data={course.data}  courseSave={courseSave} onSubmit={this.handleSubmit} onToggle={this.modalToggle} />
          </Modal>
      </div>
    )
  }

  handleDelete=(id)=>{
    confirmModalDialog({
      show:true,
      title:'ยืนยันการลบ',
      confirmLabel:'ยืนยัน ลบทันที',
      message:'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
      onConfirm: () => this.props.dispatch(deleteCourse(id)).then(() => {
        this.props.dispatch(loadCourse())
        if(!this.props.courseDelete.isRejected){
            { alertify.alert('ลบข้อมูลหลักสูตรเรียบร้อยแล้ว').set('basic', true)}
        }
        })
      })
  }
  handleEdit(id){
    this.props.dispatch(resetStatus())
    this.setState({modalTitle:'แก้ไข'})
    this.props.dispatch(getCourse(id)).then(()=>{
    this.modalToggle()
    })
  }
  handleSubmit(values){
    this.props.dispatch(saveCourse(values)).then(() => {
      if (!this.props.courseSave.isRejected) {
          this.modalToggle()
          this.props.dispatch(loadCourse())
          alertify.alert('แก้ไขข้อมูลหลักสูตรเรียบร้อยแล้ว').set('basic', true)
         
      }
  })
  }

}
  

  function mapStateToProps(state){
    return{
      courses:state.courseReducer.courses,
      course:state.courseReducer.course,
      courseDelete:state.courseReducer.courseDelete,
      courseSave:state.courseReducer.courseSave
    }
  }
  export default connect(mapStateToProps)(Coursemanage)   
