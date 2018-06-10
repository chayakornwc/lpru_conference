
import React from 'react';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderRadio = ({ input, label,  type, textarea, autoFocus, meta: { touched, error } }) => {
//สำหรับรูปแบบ Field ที่เป็น TextArea

//สำหรับรูปแบบ Field ที่เป็น TextBox

    return (
        
        <div className="field is-narrow">
            <div className="control">
                <label className="radio">
                <input {...input} type={type}  checked={input.checked} />
                {input.value==='1' && ' ก.'}{input.value==='2' && ' ข.'}{input.value==='3' && ' ค.'}{input.value==='4' && ' ง.'}
                <div style={{display:'inline-block'}}>{label}</div>
                </label>
              
            </div>
            {touched && error && <p className="help is-danger">{error}</p>}
        </div>              
                    
                    )
    }
export default renderRadio;
