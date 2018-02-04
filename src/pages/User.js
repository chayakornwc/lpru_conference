import React, { Component } from 'react';
import UserList from '../components/user/userlist';
import {connect} from 'react-redux'
import { debounce } from 'lodash';

import {
    loadUsers, getUser, saveUser,
    deleteUser, resetStatus
    } from '../redux/actions/userActions'

//import UserTable from '../components/Users/UserTable'
//import UserForm from '../components/Users/UserForm'
class User extends Component {
    constructor(props){
        super(props);
        this.state ={
                modal: false,
                modalTitle: ''        
        }
    }
componentDidMount() {
    this.props.dispatch(loadUsers());
}
render() {
    const { users, user, userSave } = this.props
        if (users.isRejected) {
        return <div>{users.data}</div>
        }
        const modal = this.state.modal ? 'is-active' : 'is-passisve';
    const userSearch = debounce(
             term => { 
                    this.handleSearch(term) }, 
                    500);
    
                return(
                    <div>
                        <h4>ผู้ใช้งาน</h4>
                            <div className="form-group row">
                                 <div className="col-sm-6">
                                    {/* ส่ง props onSearchTermChange ให้ Component SearchBar เพื่อ filgter
                                    โดยฝั่ง SearchBar จะนำไปใช้กับ event onChange */}
                                    <SearchBar
                                    onSearchTermChange={userSearch}
                                    placeholder="ค้นหา...ชื่อ-สกุล, Username" />
                                </div>
                        </div>
                        {/* แสดงข้อความ Loading ก่อน */}
                        {users.isLoading && <div>Loading...</div>}
                  
                    <UserTable
                    data={users.data}
                    buttonNew={this.handleNew}
                    buttonEdit={this.handleEdit}
                    buttonDelete={this.handleDelete}
                    />

                    <div className={"modal "+modal }>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete" aria-label="close"></button>
                        </header>
                            <section className="modal-card-body">
                            <UserForm data={user.data}  userSave={userSave}   onSubmit={this.handleSubmit}   onToggle={this.toggle} />
                        </section>
                        <footer className="modal-card-foot">
                        <button className="button is-success">Save changes</button>
                        <button className="button">Cancel</button>
                        </footer>
                    </div>
                    </div>


                </div>
                )
        }

        toggle = () => {
            this.setState({
            modal: !this.state.modal
            })
            }

        handleSearch = (term) => {
            this.props.dispatch(loadUsers(term))
        }
        handleNew = () => {
            this.props.dispatch(resetStatus())
            this.props.user.data = []
            this.setState({ modalTitle: 'เพิ่ม' })
            this.toggle();
            }

          handleEdit = (id) => {
            this.props.dispatch(resetStatus())
            this.setState({ modalTitle: 'แก้ไข' })
            this.props.dispatch(getUser(id)).then(() => {
            this.toggle()
                })
            }

        handleSubmit = (values) => {
            this.props.dispatch(saveUser(values)).then(() => {
            if (!this.props.userSave.isRejected) {
            this.toggle()
            this.props.dispatch(loadUsers())
                }
                })
            }
            
        handleDelete = (id) => {
            confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.dispatch(deleteUser(id)).then(() => {
            this.props.dispatch(loadUsers())
                })
                })
                }
                  
        
}
function mapStateToProps(state){
    return{
        users: state.userReducers.users,
        user: state.userReducers.user,
        userDelete: state.userReducers.userDelete,
        userSave: state.userReducers.userSave
    }
}

export default connect(mapStateToProps)(User)