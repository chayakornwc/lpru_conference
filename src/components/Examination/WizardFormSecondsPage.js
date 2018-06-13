import React  from 'react'
import { Field, reduxForm } from 'redux-form'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import renderRadio from './renderRadio';




const WizardFormSecondsPage = (props)=> {
  
  const onSubmit = (values)=>{
    const data = {
      values:values,
      information:props.information
    }
    props.onSubmit(data);
  }
  
    const {examinations,previousPage, handleSubmit, information} = props
  
    return (
      <div>
        <form>
        {examinations &&examinations.map(function(e,i){
          return ( 
            <div style={{borderTop:'1px solid', paddingTop:'0.25rem'}} key={i}>
                <div className="columns">
                  <div className="column">
                      ข้อ{' '}{(i+1)}{'.'}<div style={{display:'inline-block'}}>{ReactHtmlParser(unescape(e.question))}</div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <Field name={`exam${e.exam_id}`} label={ReactHtmlParser(unescape(e.answer1))} value="1" type="radio" component={renderRadio}/>
                  </div>
                  <div className="column">
                  <Field name={`exam${e.exam_id}`} label={ReactHtmlParser(unescape(e.answer2))} value="2" type="radio" component={renderRadio}/>
                  </div>
              </div>
              <div className="columns">
                <div className="column">
                <Field name={`exam${e.exam_id}`}  label={ReactHtmlParser(unescape(e.answer3))} value="3" type="radio" component={renderRadio}/>
                </div>
                <div className="column">
                <Field name={`exam${e.exam_id}`}  label={ReactHtmlParser(unescape(e.answer4))} value="4" type="radio" component={renderRadio}/>
                </div>
              </div>
            
            </div>
          )
        })}
        <button type="button" className="button is-warning" onClick={previousPage}>กลับ</button>
        {' '}
        <button type="button" onClick={handleSubmit(onSubmit)} className="button is-primary">ส่งคำตอบ</button>
    </form>
      </div>
    )
    
  }
  const form = reduxForm({
    form: 'WizardFormSecondsPage',
   
  })

export default form(WizardFormSecondsPage);