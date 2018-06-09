import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

import renderField from '../Utils/renderFields'

const WizardFormFirstPage = (props) => {
  const {handleSubmit, data, countExam} = props
  return (
        <div>
            <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                อธิบายข้อสอบ
              </h1>
              <h2 className="subtitle">
                ข้อสอบชุดนี้ เป็นข้อสอบของหลักสูตร {data && data.course_name} มีคำถามทั้งหมดจำนวน {countExam} ข้อ 
              </h2>
              <h2 className="subtitle">
               มีตัวเลือก 4 ตัวเลือกจงเลือกคำตอบที่ถูกต้องที่สุด
              </h2>
              <h2 className="subtitle">
                ระบบนี้ตรวจคำตอบของผู้สอบโดยอัติโนมัติหลังจากส่งคำตอบ กรุณาตรวจความถูกต้องของคำตอบ
              </h2>
              <h2 className="subtitle">การได้รับใบรับรองหลักสูตรต้องผ่านการทดสอบที่คะแนน มากว่าหรือเท่ากับร้อยละ 80ของข้อสอบทั้งหมด</h2>
            </div>
          </div>
        </section>

        <button onClick={handleSubmit} type="submit" className="button is-primary">เริ่มทำข้อสอบ</button> 
        </div>
  ) 
}

export default reduxForm({
  form: 'wizard',                
  destroyOnUnmount: false,        
  forceUnregisterOnUnmount: true,  
  
})(WizardFormFirstPage)
