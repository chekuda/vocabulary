import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Get, Post } from '../../components/fetchData/fetchData'
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap'
import './AddPage.css'

export default class UpdateGlosary extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      noum: [],
      verb: [],
      adjetive: [],
      adverb: []
    }
  }


  onInputChange({ value }, type) {
    this.setState({ type: value })
  }

  addNewOneMarkup(){
    return (
      <div className='new-word'>
        <div className='word-type-section'>
          <label>New Word</label>
          <input onChange={({ target }) => this.onInputChange(target, 'name')}/>
        </div>
        <div className='word-definition'>
          <div className='word-type-section'>
            <label>Noum Definition</label>
            <input onChange={({ target }) => this.onInputChange(target, 'noum')}/>
          </div>
          <div className='word-type-section'>
            <label>Verb Definition</label>
            <input onChange={({ target }) => this.onInputChange(target, 'verb')}/>
          </div>
          <div className='word-type-section'>
            <label>Adjetive Definition</label>
            <input onChange={({ target }) => this.onInputChange(target, 'adjetive')}/>
          </div>
          <div className='word-type-section'>
            <label>Adverb Definition</label>
            <input onChange={({ target }) => this.onInputChange(target, 'adverb')}/>
          </div>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.state)
    return (
      <div className='update-glosary'>
        <Header title='Add New Word' />
        { this.addNewOneMarkup() }
        <div className='button-section'>
          <button className="save-button">
            Save
          </button>
        </div>
      </div>
    )
  }
}