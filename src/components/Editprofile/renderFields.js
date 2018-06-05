import React from 'react';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderField = ({ input, label,type, disabled, textarea, autoFocus, meta: { touched, error } }) => {
//สำหรับรูปแบบ Field ที่เป็น TextArea
const textareaType = <textarea {...input} disabled={disabled}  placeholder={label} className="form-control" />;
//สำหรับรูปแบบ Field ที่เป็น TextBox
const inputType = <input {...input} disabled={disabled} placeholder={label} type={type} className={touched && error ? "input form-control is-danger":"input form-control"} autoFocus={autoFocus} />;
    return (
                <div className="field">  
                    <div className="control">
                                {/* เลือกว่าจะแสดงแบบ textarea หรือ input ธรรมดา*/}
                                    {textarea ? textareaType : inputType}
                    </div>
                                    {/* ส่วนนี้จะแสดงข้อความ error ที่ได้จากการ validate */}
                                    {touched && error && <p className="help is-danger">{error}</p>}
                    </div>
                    )
    }
export default renderField;
