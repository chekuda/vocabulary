import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import { Post } from '../../components/fetchData/fetchData'
import { Link } from 'react-router-dom'
import './Thanks.css';

class Thanks extends Component {
  constructor(props){
    super(props)
    this.results = this.getResults()
    this.user = window.localStorage.getItem('vocabulary-user') || ''
  }

  componentDidMount(){
    if(!this.results.length) return


    Post(`/api/savequiz`, { 'Content-Type': 'application/json' },  { results: this.results, user: this.user })
      .then(({ success }) => console.log('Files has been saved? =>', success))
      .catch(e => {
        console.log(e)
        this.props.history.push('/login')
      })
  }

  getResults(){
    const results = localStorage.getItem('quizResult')
    return  results ? JSON.parse(results) : []
  }

  displayResults(){
    return this.results.map((answer, i) => {
      const classResult = answer.correct ? 'right' : 'wrong'
      const definitions = answer.definition.noum.concat(answer.definition.verb).join(', ')

      return (
        <div key={i} className={`answer-section ${classResult}`}>
          <p><strong>Word</strong>: { answer.wordinEnglish }</p>
          <p><strong>Definition</strong>: { definitions }</p>
          <p><strong>Answer</strong>: { answer.answer }</p>
          <p><strong>Example used</strong>: { answer.sentenceExample } </p>
        </div>
      )
    })
  }
  getOveralView(){
   const rightAnswes = this.results.reduce((acc, answer) => answer.correct ? ++acc : acc, 0)
    return (
      <div className='overalView'>
        <strong>Right Answers</strong>{`: ${rightAnswes} / ${this.results.length}`}
      </div>
    )
  }


  render() {
    return (
      <div className="Thanks">
        <Header title='Well Done'/>
        { this.getOveralView() }
        { this.displayResults() }
        <div className='button-section'>
          <Link className='main-button' to='/'>Back Home</Link>
        </div>
      </div>
    );
  }
}

export default Thanks;
