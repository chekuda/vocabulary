import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import { Redirect } from 'react-router-dom'
import './AddPage.css'

export default class UpdateGlosary extends Component {
  constructor(){
    super()
    this.state = { wordAdded: false }
  }
  saveNewWord(){
    if(!this.state.name) return

    Post('/api/addnewword', { 'Content-Type': 'application/json' }, this.state)
      .then(({ success }) => {
        if(success) {
          alert('Word Saved')
          this.setState({ wordAdded: true })
        } else{
          alert('Could not save the word, please try again')
        }
      })
  }


  onInputChange({ value }, type) {
    this.setState({ [type]: value })
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
    return (
      <div className='update-glosary'>
        <Header title='Add New Word' />
        { this.addNewOneMarkup() }
        <div className='button-section'>
          <button className="save-button" onClick={ () => this.saveNewWord() }>
            Save
          </button>
        </div>
        { this.state.wordAdded &&  <Redirect to={{ pathname: '/updateglosary' }}/>}
      </div>
    )
  }
}