import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class UserTable extends Component {
    render() {
        const { data, buttonNew, buttonEdit, buttonDelete } = this.props
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="120" className="text-center">ประเภทผู้ใช้</th>
                            <th>ชื่อ-สกุล</th>
                            <th>Username</th>
                            <th width="120" className="text-center">
                            <Button color="success" size="sm"onClick={buttonNew}>เพิ่มข้อมูล</Button>
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
                        <td>{e.name}</td>
                        <td>{e.username}</td>
                        <td className="text-center">
                        <Button color="secondary" size="sm"
                        onClick={() => buttonEdit(e.id)}>แก้ไข</Button>{' '}
                        <Button color="danger" size="sm"
                        onClick={() => buttonDelete(e.id)}>ลบ</Button>
                        </td>
                    </tr>
                    )
                    })}
                    </tbody>
                    </Table>
            </div>
        );
    }
}


export default UserTable;