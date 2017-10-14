import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      pictures: [],
      favourited: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.keyPress = this.keyPress.bind(this)
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  keyPress (e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.searchResult()
    }
  }

  handleClick (fav, id, e) {
    this.setState({
      favourited: this.state.favourited.concat([fav])
    })
    document.getElementById(id).style = 'color:#ff0000; opacity: 1'
  }

  searchResult (e) {
    var input = this.state.value
    const url = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=FHvvDNm13xAj2exfW1h4gykFJWXMz3W3&limit=8'
    fetch(url)
    .then(response => response.json())
    .then(result => {
      let pictures = result.data.map((pic) => {
        return (
          <div className='box' key={pic.id}>
            <img src={pic.images.downsized_still.url} alt={this.state.value} onClick={(e) => this.handleClick(pic.images.downsized_still.url, pic.id, e)} />
            <div className='redheart' id={pic.id}>&hearts;</div>
          </div>
        )
      })
      this.setState({pictures: pictures})
    })
  }

  render () {
    return (
      <div>
        <form>
          <input placeholder='Start searching for images!' type='text' value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
        </form>
        <div className='wrapper'>
          {this.state.pictures}
        </div>
      </div>
    )
  }
}
