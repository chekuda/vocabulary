import React, { Component } from 'react'
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props){
    super(props)

    this.state = { term: '' }
  }
  onInputChange(term) {
    this.setState({ term })
    this.props.onSearchTermChange(term)
  }
  render() {
    return (
      <div className='search-bar'>
        <input
          value={ this.state.term }
          onChange={ ({ target }) => this.onInputChange(target.value) }
        />
      </div>
    )
  }
}

export default SearchBar