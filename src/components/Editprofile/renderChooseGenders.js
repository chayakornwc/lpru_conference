
import React from 'react';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderChooseGender = ({ input, label,  type, textarea, autoFocus, meta: { touched, error } }) => {
//สำหรับรูปแบบ Field ที่เป็น TextArea

//สำหรับรูปแบบ Field ที่เป็น TextBox

    return (
        
        <div class="field is-narrow">
            <div class="control">
                <label class="radio">
                <input {...input} type={type}  checked={input.checked} />
                {' '}{label}
                </label>
              
            </div>
            {touched && error && <p className="help is-danger">{error}</p>}
        </div>              
                    
                    )
    }
export default renderChooseGender;
