import React from 'react';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderInput = ({ input, label, type, textarea, autoFocus, meta: { touched, error } }) => {
//สำหรับรูปแบบ Field ที่เป็น TextArea

//สำหรับรูปแบบ Field ที่เป็น TextBox
 const inputType = <input {...input} placeholder={label} type={type} className="form-control" autoFocus={autoFocus} />;
    return (
                <div>
                        <div>
                                {/* เลือกว่าจะแสดงแบบ textarea หรือ input ธรรมดา*/}
                                    {inputType}
                                    {/* ส่วนนี้จะแสดงข้อความ error ที่ได้จากการ validate */}
                                    {touched && error && <small className="text-danger">{error}</small>}
                        </div>
                    </div>
                    )
    }
 


export default renderInput;