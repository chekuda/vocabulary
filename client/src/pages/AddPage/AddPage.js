import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import { Redirect } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import './AddPage.css'

export default class UpdateGlosary extends Component {
  constructor(){
    super()
    this.state = { wordAdded: false, toggleTip: false }
  }

  saveNewWord(){
    Post('/api/addnewword', { 'Content-Type': 'application/json' }, this.state)
      .then(({ success } = {}) => {
        if(success) {
          this.launchModal('success')
        } else{
          this.launchModal('error')
        }
      })
      .catch(e => {
        console.log(e)
        this.props.history.push('/login')
      })
  }

  onModalButtonAction = event => {
    if(event === 'Glosary') this.setState({ wordAdded: true }) //This will be the same if word is success added or nor
    if(event === 'Accept') this.saveNewWord()
    this.setState({ enableModal: false })
  }

  launchModal(type){
    if(!this.state.name) return

    const modalProps = {
      save: {
        title: false,
        body: `Are you sure you want to save the word: '${this.state.name.toUpperCase()}'`,
        acceptButton: { enabled: true, text: 'Accept', background: '#6fad6f'},
        closeButton: { enabled: true, text: 'Cancel', background: '#cc605c' }
      },
      error: {
        title: 'ERROR',
        body: `The word '${this.state.name.toUpperCase()}' couldnt be saved`,
        closeButton: { enabled: true, text: 'Glosary', background: '#6fad6f' },
        acceptButton: { enabled: false },
      },
      success: {
        title: 'SUCCESS',
        body: `The word '${this.state.name.toUpperCase()}' have been saved`,
        closeButton: { enabled: true, text: 'Glosary', background: '#6fad6f' },
        acceptButton: { enabled: false },
      }
    }

    this.setState({ modalProps: modalProps[type], enableModal: true })
  }

  onInputChange({ value }, type) {
    this.setState({ [type]: value })
  }

  toggleToolTip(val){
    this.setState({ toggleTip: val })
  }

  addDefinitionpMarkup(){
    const typeDefinition = ['noum', 'verb', 'adjetive', 'adverb']
    return (
      <div className='word-definition'>
      { typeDefinition.map((type, index) => {
          return (
            <div key={index}>
              <Tooltip className="my-tooltip" placement="bottom" isOpen={this.state.toggleTip === type} autohide={false} target={type} toggle={() => this.toggleToolTip(type)}>
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
          <input id='name' onChange={({ target }) => this.onInputChange(target, 'name')} onClick={() => this.toggleToolTip('none')}/>
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
        {this.state.enableModal && <Modal {...{ ...this.state.modalProps, oncloseRequest: this.onModalButtonAction }}/> }
        { this.addNewOneMarkup() }
        <div className='button-section'>
          <button className="save-button" onClick={ () => this.launchModal('save') }>
            Save
          </button>
        </div>
        { this.state.wordAdded && <Redirect to={{ pathname: '/updateglosary' }}/>}
      </div>
    )
  }
}