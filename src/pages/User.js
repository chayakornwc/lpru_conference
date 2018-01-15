import React, { Component } from 'react';
import UserList from '../components/user/userlist';
import {connect} from 'react-redux'
import { loadUsers } from '../actions'
class User extends Component {
componentDidMount() {
    this.props.loadUsers()
}
render() {
    const { users } = this.props
if (users.isRejected) {
return <div>Error....</div>
}

return (
<div>
<h1>Users</h1>
<UserList data={users.data} />
</div>
)
}
}
function mapStateToProps(state){
return {
users: state.users
}
}
function mapDispatchToProps(dispatch){
    return{
    loadUsers: ()=>{
    dispatch({
    type: 'LOAD_USERS',
    payload: fetch('https://jsonplaceholder.typicode.com/users')
    .then(result => result.json())
    })
    }
    }
    }
export default connect(mapStateToProps, mapDispatchToProps)(User)