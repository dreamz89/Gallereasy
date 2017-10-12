import React, { Component } from 'react'

export default class Search extends Component {
  render () {
    return (
      <div>
        <form action='GET'>
          <input placeholder='Start searching for images!' type="text" />
       </form>
      </div>
    )
  }
}
