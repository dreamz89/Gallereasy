import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      pictures: []
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

  searchResult (e) {
    var input = this.state.value
    const url = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=FHvvDNm13xAj2exfW1h4gykFJWXMz3W3&limit=8'
    fetch(url)
    .then(response => response.json())
    .then(result => {
      let pictures = result.data.map((pic) => {
        return (
          <img className='image' src={pic.images.original_still.url} alt={this.state.value} />
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
