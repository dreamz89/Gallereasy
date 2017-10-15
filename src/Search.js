import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      pictures: [],
      noresult: '',
      loadmore: ''
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
      this.setState({pictures: []})
      this.searchResult()
    }
  }

  handleClick (e) {
    if (this.props.favs.includes(e.target.src)) {
      this.props.onRemove(e.target.src)
      document.getElementById(e.target.className).className = 'redheart'
    } else {
      this.props.onAdd(e.target.src)
      document.getElementById(e.target.className).className = 'favheart'
    }
  }

  searchResult (e) {
    var numresults = this.state.pictures.length
    // var value = this.state.value.replace(/ /g, '+')
    var input = this.state.value || document.getElementsByTagName('button').value
    const url = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=FHvvDNm13xAj2exfW1h4gykFJWXMz3W3&limit=8&offset=' + numresults
    fetch(url)
    .then(response => response.json())
    .then(result => {
      var pictures = result.data.map((pic) => {
        if (this.props.favs.includes(pic.images.downsized_still.url)) {
          var heart = <div className='favheart' id={pic.id}>&hearts;</div>
        } else {
          heart = <div className='redheart' id={pic.id}>&hearts;</div>
        }
        return (
          <div className='box' key={pic.id}>
            <img src={pic.images.downsized_still.url} alt={this.state.value} className={pic.id} onClick={this.handleClick.bind(this)} />
            {heart}
          </div>
        )
      })
      if (pictures.length === 0) {
        this.setState({noresult: 'No images found'})
        this.setState({pictures: pictures})
        this.setState({loadmore: ''})
      } else {
        this.setState({noresult: ''})
        this.setState({pictures: this.state.pictures.concat(pictures)})
        var remaining = result.pagination.total_count - this.state.pictures.length
        this.setState({loadmore: <button value={input} onClick={this.searchResult.bind(this)}>Load more <br /> ({remaining} images left)</button>})
      }
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
        {this.state.loadmore}
        <h2 className='noresult'>{this.state.noresult}</h2>
      </div>
    )
  }
}
