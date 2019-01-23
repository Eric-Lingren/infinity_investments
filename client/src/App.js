import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Performance from './components/performance/Performance';


class App extends Component {
  render() {
    return (
      <div className="App">
        

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/performance" component={Performance} />
        </Switch>
          
      </div>
    );
  }
}

export default App;
