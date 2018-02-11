import React, {Component} from 'react';
import propTypes from 'prop-types';

class searchBar extends Component {
    constructor(props){
    super(props);
    this.state = {term:''};
    }
    //รูปแบบการกำหนด PropTypes เพื่อเช็ค props ที่ส่งเข้ามา
    static propTypes ={
        onSearchTermChange:propTypes.func.isRequired,
        placeholder:propTypes.string
    }
    render(){
        return(
            <div className="field has-addons">
                <div className="control">
                    <input className="input" type="text" placeholder={this.props.placeholder} style={this.props.style}   value={this.state.term} onChange={e=> this.onInputChange(e.target.value)} />
                </div>
                <div className="control"><a className="button is-static"><span className="icon is-small"><i className="fas fa-search"></i></span><span></span></a></div>
            </div>
        )
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }   
}

export default searchBar;   