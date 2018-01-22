import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
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
  }

  componentWillMount(){
    this.getWordsFromServer()
  }

  onSearchTermChange = (current) =>{
    const currentList = this.state.vocabulary.filter(({ wordinEnglish }) => wordinEnglish.indexOf(current.toLocaleLowerCase()) !== -1)
    this.setState({ currentList: currentList, firstLoad: false })
  }

  removeElement({ wordinEnglish }){
    Post('/api/removeword', { 'Content-Type': 'application/json' }, { word: wordinEnglish })
      .then(({ success }) => this.getWordsFromServer())
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
                  <span className='fa fa-times' onClick={() => this.removeElement(word)}></span>
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
        <SearchBar onSearchTermChange={ this.onSearchTermChange }/>
        <Link className='add-new-one' to='/addpage'>Add New One <span className='fa fa-plus'></span></Link>
        { this.state.vocabulary.length > 0 && this.getListVocabularyMarkup() }
      </div>
    )
  }
}