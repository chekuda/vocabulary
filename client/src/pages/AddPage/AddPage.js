import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import { Redirect } from 'react-router-dom'
import './AddPage.css'

export default class UpdateGlosary extends Component {
  constructor(){
    super()
    this.state = { wordAdded: false, toggleTip: false }
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

  toggle(val){
    this.setState({ toggleTip: val })
  }

  addDefinitionpMarkup(){
    const typeDefinition = ['noum', 'verb', 'adjetive', 'adverb']
    return (
      <div className='word-definition'>
      { typeDefinition.map((type, index) => {
          return (
            <div key={index}>
              <Tooltip className="my-tooltip" placement="bottom" isOpen={this.state.toggleTip === type} autohide={false} target={type} toggle={() => this.toggle(type)}>
                For instance: first, second, third
              </Tooltip>
              <div className='word-type-section'>
                <label>{`${type.charAt(0).toUpperCase()}${type.slice(1)}`} Definition</label>
                <input id={type} onChange={({ target }) => this.onInputChange(target, type)}/>
              </div>
            </div>
          )
        })
      }
      </div>
    )
  }

  addNewOneMarkup(){
    return (
      <div className='new-word'>
        <div className='word-type-section'>
          <label>New Word</label>
          <input id='name' onChange={({ target }) => this.onInputChange(target, 'name')} onClick={() => this.toggle('none')}/>
        </div>
        <div className='word-definition'>
          { this.addDefinitionpMarkup() }
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
        { this.state.wordAdded && <Redirect to={{ pathname: '/updateglosary' }}/>}
      </div>
    )
  }
}