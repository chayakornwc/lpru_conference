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
            <div>
                <input placeholder={this.props.placeholder} className="form-control"  value={this.state.term} onChange={e=> this.onInputChange(e.target.value)} />
            </div>
        )
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }   
}

export default searchBar;   