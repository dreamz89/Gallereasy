import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Favourites from './Favourites'

export default class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>Galler<b>easy</b></li>
                <li><NavLink to='/search'><b>Search</b></NavLink></li>
                <li><NavLink to='/favourites'><b>Favourites</b></NavLink></li>
              </ul>
            </nav>

            <Switch>
              <Route path='/search' component={Search} />
              <Route path='/favourites' component={Favourites} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
