import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import Header from './components/header/'
import Footer from './components/footer'

class App extends Component {
  render() {
  return(
    <div className="App">
        <Header />
        <div className="sucction">
        {this.props.children}
        </div>
        <div>
            <Footer />
        </div>
    </div>)

    }
}
export default App;