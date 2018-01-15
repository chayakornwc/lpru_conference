    import React, { Component }  from 'react';
    
      class Uploadfiles extends Component {
          
        render() {
           
            return (
                <div>
            <div className="file has-name is-fullwidth is-orange">
                <label className="file-label">
                    <input className="file-input" required  type="file" onChange={this.props.onChange} value={this.props.filesname} name={this.props.name} placeholder={this.props.uploadtitle} />
                    <span className="file-cta" >
                   
                    <span className="file-label">
                      Choose files
                    </span>
                    </span>
                    <span className="file-name">
                        {this.props.uploadtitle}
                    </span>
                </label>
               
                </div>
                 <p class="helpet-text">{this.props.description}</p>
                   </div>     
            );
        }
    }
        
export default Uploadfiles;
