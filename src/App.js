import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Create from "./components/create.component";
import Edit from "./components/edit.component";
import List from "./components/list.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" target="_blank">
              <p>S</p>
            </a>
            <Link to="/" className="navbar-brand">Stock Alerts</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create</Link>
              </li>
              {/* <li className="navbar-item">
                  <Link to="/edit/:id" className="nav-link">Edit</Link>
              </li> */}
              </ul>
            </div>
          </nav>
        <br/>
        <Route path="/" exact component={List}/>
        <Route path="/edit/:id" component={Edit}/>
        <Route path="/create" component={Create}/>
        </div>
      </Router>
    );
  }
}

export default App;