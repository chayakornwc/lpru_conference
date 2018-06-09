import React  from 'react'
import { Field, reduxForm } from 'redux-form'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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
                      {ReactHtmlParser(unescape(e.question))}
                  </div>
                </div>

                <div className="columns">
                <div className="column">
                  {unescape(e.answer1)}
                </div>
                <div className="column">
                {unescape(e.answer1)}
                </div>
              </div>
              <div className="columns">
                <div className="column">
                {unescape(e.answer1)}
                </div>
                <div className="column">
                {unescape(e.answer1)}
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