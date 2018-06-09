import React  from 'react'
import { Field, reduxForm } from 'redux-form'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import renderRadio from './renderRadio';
const WizardFormSecondsPage = (props)=> {
    const {examinations,previousPage,handleSubmit} = props
    return (
      <div>
        <form onSubmit={handleSubmit}>
     
     
        {examinations &&examinations.map(function(e,i){
          return ( 
            <div className="container">
                <div className="columns" key={i}>
                  <div className="column">
                      ข้อ{(i+1)}{'. '}{ReactHtmlParser(unescape(e.question))}
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <Field name={e.exam_id} label={ReactHtmlParser(unescape(e.answer1))} value="1" type="radio" component={renderRadio}/>
                  </div>
                  <div className="column">
                  <Field name={e.exam_id} label={ReactHtmlParser(unescape(e.answer2))} value="2" type="radio" component={renderRadio}/>
                  </div>
              </div>
              <div className="columns">
                <div className="column">
                <Field name={e.exam_id} label={ReactHtmlParser(unescape(e.answer3))} value="3" type="radio" component={renderRadio}/>
                </div>
                <div className="column">
                <Field name={e.exam_id} label={ReactHtmlParser(unescape(e.answer4))} value="4" type="radio" component={renderRadio}/>
                </div>
              </div>
            </div>
          )
        })}
        <label>Sex</label>
      
      <div className="footer">
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
      </div>
    )
  }


export default WizardFormSecondsPage;