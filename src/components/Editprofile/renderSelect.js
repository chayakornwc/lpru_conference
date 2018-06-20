import React from 'react';
//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderSelect = ({  input, data, label, type, textarea, autoFocus, meta: { touched, error } }) => {


    return (
                    <div className="field is-narrow">
                        <div className="control">
                            <div className={touched && error ? 'select is-fullwidth is-danger': 'select is-fullwidth'}>
                            <select {...input} value={input.value} className="form-control" >  
                            <option value="">กรุณาเลือก</option>  
                            {data && data.map((e, i) =>(
                                <option key={i} value={e}>{e}</option>
                            ))
                            }
                            </select> 
                            </div>
                        </div>
                        {touched && error && <p className="help is-danger">{error}</p>}
                        </div>
                    
                    )
    }
export default renderSelect;
