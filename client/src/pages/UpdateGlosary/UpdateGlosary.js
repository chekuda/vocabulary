import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import './UpdateGlosary.css'

export default class UpdateGlosary extends Component {
  constructor(){
    super()
    this.user = window.localStorage.getItem('vocabulary-user') || ''
    this.state = {
      vocabulary: [],
      firstLoad: true,
      currentList: [],
      newWord: {}
    }
  }

  getWordsFromServer(){
    Post('/api/getvocabulary',{ 'Content-Type': 'application/json' },  { user: this.user })
      .then(({ data }) => this.setState({ vocabulary: data }))
      .catch(e => {
        console.log(e)
        this.props.history.push('/login')
      })
  }

  componentWillMount(){
    this.getWordsFromServer()
  }

  onSearchTermChange = (current) =>{
    const currentList = this.state.vocabulary.filter(({ wordinEnglish }) => wordinEnglish.indexOf(current.toLocaleLowerCase()) !== -1)
    this.setState({ currentList: currentList, firstLoad: false })
  }

  removeElement(){
    Post('/api/removeword', { 'Content-Type': 'application/json' }, { word: this.state.wordToRemove })
      .then(({ success }) => {
        if(success) {
          this.launchModal('success', this.state.wordToRemove)
        } else {
          this.launchModal('error', this.state.wordToRemove)
        }
      })
      .catch(e => {
        console.log(e)
        this.props.history.push('/login')
      })
  }

  onModalButtonAction = event => {
    if(event === 'Ok') this.getWordsFromServer()
    if(event === 'Accept') this.removeElement()
    this.setState({ enableModal: false })
  }

  launchModal(type, word){
    const modalProps = {
      remove: {
        title: false,
        body: `Are you sure you want to remove the word: '${word.toUpperCase()}'`,
        acceptButton: { enabled: true, text: 'Accept', background: '#6fad6f'},
        closeButton: { enabled: true, text: 'Cancel', background: '#cc605c' }
      },
      error: {
        title: 'ERROR',
        body: `The word '${word}' couldnt be removed`,
        closeButton: { enabled: true, text: 'Ok', background: '#6fad6f' },
        acceptButton: { enabled: false },
      },
      success: {
        title: 'SUCCESS',
        body: `The word '${word}' have been removed`,
        closeButton: { enabled: true, text: 'Ok', background: '#6fad6f' },
        acceptButton: { enabled: false },
      }
    }
    this.setState({
      modalProps: modalProps[type],
      enableModal: true,
      wordToRemove: word
    })

  }

  getListVocabularyMarkup(){
    const ListToShow = this.state.firstLoad ? this.state.vocabulary : this.state.currentList

    return (
      <ul className='vocabulary-list'>
        {
          ListToShow.map((word, index) => {
            return (
              <li key={index} className='words-list'>
                <div className='list-word'>{ word.wordinEnglish }</div>
                <div className='list-icon'>
                  <span className='fa fa-refresh'></span>
                  <span className='fa fa-times' onClick={() => this.launchModal('remove', word.wordinEnglish)}></span>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className='update-glosary'>
        <Header title='Update Glosary' />
        {this.state.enableModal && <Modal {...{ ...this.state.modalProps, oncloseRequest: this.onModalButtonAction }}/> }
        <SearchBar onSearchTermChange={ this.onSearchTermChange }/>
        <div><Link className='add-new-one' to='/addpage'>Add New One <span className='fa fa-plus'></span></Link></div>
        <div>
          { this.state.vocabulary.length > 0 && this.getListVocabularyMarkup() }
        </div>
        <div className='button-section'>
          <Link className='main-button' to='/'>Back Home</Link>
        </div>
      </div>
    )
  }
}