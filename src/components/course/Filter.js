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
    // handleChang = name => event=> {
    //     this.setState({
    //      [name]: moment(event).isValid()  ? moment(event).format('LL') : ''
    //     })
    //     var startDate = this.state.startDate? this.state.startDate: '';
    //     var endDate = this.state.endDate? this.state.endDate: '';
    //     var term = this.state.term ? this.state.term:'';
    //     var options =  this.state.options ? this.state.options:'';
    //     if(name == 'startDate'){
    //         startDate = moment(event).isValid() ? moment(event).format('LL') : '';
          
    //     }
    //     if(name=='endDate'){
    //        endDate = moment(event).isValid() ?  moment(event).format('LL'): '';
    //     }
    //      this.props.onSearchChange(term,startDate, endDate,options);
       
    //   }
    //   handleCheck = e =>{
    //     const options =this.state.options
    //     var startDate = this.state.startDate? this.state.startDate: '';
    //     var endDate = this.state.endDate? this.state.endDate: '';
    //     var term = this.state.term ? this.state.term:'';
    //     let index
       
    //     if (e.target.checked) {
    //       // add the numerical value of the checkbox to options array
    //       options.push(+e.target.value)
    //     } else {
    //       // or remove the value from the unchecked checkbox from the array
    //       index = options.indexOf(+e.target.value)
    //       options.splice(index, 1)
    //     }
       
    //     // update the state with the new array of options
    //     this.setState({ options: options })
        
    //     this.props.onSearchChange(term,startDate, endDate,options);
    //   }
    
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