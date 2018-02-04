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

                    <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
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
}
function mapStateToProps(state){

}
function mapDispatchToProps(dispatch){
  
    
    }
export default connect(mapStateToProps, mapDispatchToProps)(User)