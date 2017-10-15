import React, { Component } from 'react'

export default class Favourites extends Component {
  render () {
    var pictures = this.props.favs.map((pic) => {
      return (
        <div className='box' key={pic}>
          <img src={pic} alt='fav' />
        </div>
      )
    })

    return (
      <div className='wrapper'>
        {pictures}
      </div>
    )
  }
}
