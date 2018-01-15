import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import Header from './components/header/'

class App extends Component {
  render() {
  return(
    <div className="App">
        <Header />
        <div className="container">
        <div className="content">
        {this.props.children}
        </div>
        </div>
    </div>)

    }
}
export default App;