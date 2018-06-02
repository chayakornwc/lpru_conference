import React, { Component } from 'react';
import propTypes from 'prop-types';
// import Datepicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
class Filter extends Component {

    static propTypes ={
        onSearchTermChange:propTypes.func.isRequired,
        placeholder:propTypes.string,
        title:propTypes.string
    }

    constructor(props){
        super(props);
        
    }
    
    onInputChange(term) {
        this.props.onSearchTermChange(term);
      
    }   
   
    
  render() {
      const {placeholder, title }= this.props
    return (
      <div className="container">
            <div className="box border" style={{padding:'1.25rem'}}>
                <header className="card-header">
                    <p className="card-header-title">
                        {title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="text" onChange={e=>{this.onInputChange(e.target.value)}} placeholder={placeholder} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    )
  }
}
export default Filter;