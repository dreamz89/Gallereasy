import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Favourites from './Favourites'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favourited: [],
      total: 0
    }
    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }
  onAdd (fav) {
    this.setState({
      favourited: this.state.favourited.concat([fav]),
      total: this.state.total + 1
    })
  }

  onRemove (fav) {
    var index = this.state.favourited.indexOf(fav)
    this.state.favourited.splice(index, 1)
    this.setState({
      favourited: this.state.favourited,
      total: this.state.total - 1
    })
  }

  render () {
    if (this.state.total > 0) {
      var tot = <p>({this.state.total})</p>
    }

    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>Galler<b>easy</b></li>
                <li><NavLink to='/search'><b>Search</b></NavLink></li>
                <li><NavLink to='/favourites'><b>Favourites {tot}</b></NavLink></li>
              </ul>
            </nav>

            <Switch>
              <Route path='/search' render={() => <Search onAdd={this.onAdd} onRemove={this.onRemove} favs={this.state.favourited} />} />
              <Route path='/favourites' render={() => <Favourites favs={this.state.favourited} />} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
