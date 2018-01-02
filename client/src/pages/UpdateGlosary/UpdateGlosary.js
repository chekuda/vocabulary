import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Get, Post } from '../../components/fetchData/fetchData'
import SearchBar from '../../components/SearchBar/SearchBar'
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap'
import './UpdateGlosary.css'

export default class UpdateGlosary extends Component {
  constructor(){
    super()
    this.state = {
      vocabulary: [],
      firstLoad: true,
      currentList: [],
      newWord: {}
    }
  }

  componentWillMount(){
    Get('/api/getvocabulary/vocabulary')
    .then(res =>this.setState({ vocabulary: res.words }))
  }

  onSearchTermChange = (current) =>{
    const currentList = this.state.vocabulary.filter(({ wordinEnglish }) => wordinEnglish.indexOf(current.toLocaleLowerCase()) !== -1)
    this.setState({ currentList: currentList, firstLoad: false })
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
                  <span className='fa fa-times'></span>
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
        <div className='add-new-one' onClick={ () => window.location.href = '/addpage' }>Add New One <span className='fa fa-plus'></span></div>
        { this.state.vocabulary.length > 0 && this.getListVocabularyMarkup() }
      </div>
    )
  }
}