import React, { Component } from 'react';
//import UserList from '../components/user/userlist';
import {connect} from 'react-redux'
import { debounce } from 'lodash';
import ReactDOM from 'react-dom';
import { loadUsers, getUser, saveUser,
    deleteUser, resetStatus
    } from '../redux/actions/userActions';


import { confirmModalDialog } from '../components/Utils/reactConfirmModalDialog';
//import {modalDialog} from '../components/Utils/reactModalDialog';
import Modal from 'react-modal';
import SearchBar from '../components/Utils/searchBar';
import UserTable from '../components/Users/UserTable';
import UserForm from '../components/Users/UserForm';
const alertify = require('alertify.js');
const ModalStyle = {
    content : {
      marginBottom:'0',  
      maxWidth:'600px', 
      margin:'0 auto',
      background:'#fff',
      marginTop:'100px',
      padding:'1rem',
      borderRadius:'1rem',
      border:'solid 1px',
      height:'800px',
      overflowY:'scroll',
      overflowX:'hidden'
     
    }
  };
class User extends Component {
    //มีการใช้ Modal ของ reactstrap ซึ่งจะต้องเก็บ State การแสดง modal ไว้
    state = {
        modal: false,
        modalTitle: ''
    }

    //สั่ง dispach ฟังก์ชัน loadUsers
    componentDidMount() {
        this.props.dispatch(loadUsers())
    }

  
    render() {
        const { users, user, userSave } = this.props
        if (users.isRejected) {
            //ถ้ามี error
            return <div>{users.data}</div>
        }
           
        

        //debounce เป็นการหน่วงการส่งตัวอักษรเป็นฟังก์ชันของ lodash ทำเพื่อเรียกใช้การ filter ข้อมูล
        const userSearch = debounce(term => { this.handleSearch(term) }, 500);
        
        const modalActive = this.state.modal  ? 'is-active' : '';
        //  const active = this.state.modal ? 'is-active':'is-passive'; 
    
        return (
         <div>
            <div className="notification">
                <div className="container ">
                        <div className="tile tile is-8 is-vertical md-auto w-card">
                            <h1 className="title">ผู้ใช้งาน ระบบสารสนเทศการอบรม </h1>
                            <div className="empty">
                                <div style={{marginLeft:'1rem'}} className="col-sm-6">
                                    {/* ส่ง props onSearchTermChange ให้ Component SearchBar เพื่อ filter
                                    โดยฝั่ง SearchBar จะนำไปใช้กับ event onChange */}
                                    <SearchBar onSearchTermChange={userSearch}  placeholder="ค้นหา...ชื่อ-สกุล Username" style={{width:'300px'}} />
                                </div>
                            </div>
                            
                            {/* แสดงข้อความ Loading ก่อน */}
                            {users.isLoading && <div>Loading...</div>}

                            {/* Component UserTable จะส่ง props ไป 4 ตัว */}
                            <UserTable
                                data={users.data}
                                buttonNew={this.handleNew}
                                buttonEdit={this.handleEdit}
                                buttonDelete={this.handleDelete}
                            />
                                  {this.props.children}
                            {/* เป็น Component สำหรับแสดง Modal ของ reactstrap 
                            ซึ่งเราต้องควบคุมการแสดงไว้ที่ไฟล์นี้ ถ้าทำแยกไฟล์จะควบคุมยาก */}
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary" autoFocus={false}  style={ModalStyle}>
                   
                    {/* เรียกใช้งาน Component UserForm และส่ง props ไปด้วย 4 ตัว */}
                    <UserForm  header={this.state.modalTitle+ " ผู้ใช้งาน"}   data={user.data} userSave={userSave} onSubmit={this.handleSubmit} onToggle={this.toggle} />
                    </Modal>
                       </div> 
                </div>
             </div>
        </div>
        )
    }

    //ฟังก์ชันสั่งแสดง/ปิด modal
    toggle = () => {
        
        this.setState({
            modal: !this.state.modal
        })
        //console.log(this.props.user.data)
     
    }

    //ฟังก์ชัน filter ข้อมูล
    handleSearch = (term) => {
        this.props.dispatch(loadUsers(term))
    }

    //ฟังก์ชันสร้างข้อมูลใหม่โดยจะสั่งให้เปิด Modal
    handleNew = () => {
      
        this.props.dispatch(resetStatus())
        this.props.user.data = []
        this.setState({ modalTitle: 'เพิ่ม' })
        this.toggle();
    }

    //ฟังก์ชันแก้ไขข้อมูล และสั่งให้เปิด Modal โดยส่งข้อมูลไปแป๊ะให้กับฟอร์มด้วย
    handleEdit = (id) => {
        this.props.dispatch(resetStatus())
        this.setState({ modalTitle: 'แก้ไข' })
        this.props.dispatch(getUser(id)).then(() => {
            this.toggle()
        })

    }

    //ฟังก์ชันบันทึกข้อมูล
    handleSubmit = (values) => {
        this.props.dispatch(saveUser(values)).then(() => {
            if (!this.props.userSave.isRejected) {
                this.toggle()
                this.props.dispatch(loadUsers())
                {alertify.alert('บันทึกข้อมูลเรียบร้อยแล้ว')}
            }
        })
    }
    
    //ฟังก์ชันลบข้อมูล
    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลผู้ใช้นี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm : () => this.props.dispatch(deleteUser(id)).then(() => {
                this.props.dispatch(loadUsers())
                if(!this.props.userDelete.isRejected){
                    {alertify.success('ลบข้อมูลผู้ใช้เรียบร้อยแล้ว')}
                }
            })
        })
    }
}

function mapStateToProps(state) {
    return {
        users: state.userReducers.users,
        user: state.userReducers.user,
        userDelete: state.userReducers.userDelete,
        userSave: state.userReducers.userSave
    }
}

export default connect(mapStateToProps)(User)   