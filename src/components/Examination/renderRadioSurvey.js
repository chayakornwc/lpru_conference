
import React from 'react';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderRadioSurvey = ({ input, label,  type, textarea, autoFocus, meta: { touched, error } }) => {
//สำหรับรูปแบบ Field ที่เป็น TextArea

//สำหรับรูปแบบ Field ที่เป็น TextBox

    return (
        
        <div className="field is-narrow">
            <div className="control">
                <label className="radio">
                <input {...input} type={type}  checked={input.checked} />
                </label>
            </div>
        </div>              
                    
                    )
    }
export default renderRadioSurvey;
