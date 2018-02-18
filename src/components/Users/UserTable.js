import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

//แสดงรายชื่อข้อมูลผู้ใช้ แสดงแบบ HTML TABLE
class UserTable extends Component {
    render() {
        //Destructuring ค่า props ที่ส่งมาจาก  src/pages/User.js  
        const { data, buttonNew, buttonEdit, buttonDelete } = this.props
    

        return (
            <table className="table is-striped table-responsive" striped bordered hover>
                <thead>
                    <tr>
                        <th width="120" className="text-center">ประเภทผู้ใช้</th>
                        <th>ชื่อ-สกุล</th>
                        <th>Username</th>
                        <th>สังกัด</th>
                        <th>หน่วยงาน</th>
                        <th width="120" className="text-center">
                            <button className="button " 
                                onClick={buttonNew}><span className="icon is-small"><i className="fas fa-plus"></i></span><span>เพิ่มข้อมูล</span></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ข้อมูลที่ได้รับมา */}
                    {data && data.map(e => {
                        return (
                            <tr key={e.id}>
                                <td className="text-center">
                                    {(e.user_group === 0) ? 'ทั่วไป' : 'ผู้ดูแลระบบ'}
                                </td>
                                <td>{e.prefix} {e.first_name} {e.last_name}</td>
                                <td>{e.username}</td>
                                <td>{e.affiliation}</td>
                                <td>{e.company}</td>
                                <td className="text-center">
                                    <button className="button is-warning is-small" onClick={() => buttonEdit(e.id)}>แก้ไข</button>{' '}
                                    <button className="button is-danger is-outlined is-small" onClick={() => buttonDelete(e.id)}><span className="icon is-small"><i className="fas fa-times"></i></span><span>ลบ</span></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default UserTable
