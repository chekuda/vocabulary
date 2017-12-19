import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import './ListTest.css';

class ListTest extends Component {
  constructor(props){
    super(props)
    this.results = this.getResults()
  }

  getResults(){
    const results = sessionStorage.getItem('testResult')
    return  results ? JSON.parse(results) : []
  }

  displayResults(){
    return this.results.map((answer, i) => {
      const classResult = answer.correct ? 'right' : 'wrong'
      const definitions = answer.definition.noum.concat(answer.verb).toString()

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

    return <div>jose</div>

    // return (
    //   <div className="ListTest">
    //     <Header title='Well Done'/>
    //     { this.getOveralView() }
    //     { this.displayResults() }
    //     <div className='button-section'>
    //       <button className='main-button' onClick={() => window.location.href = '/'}>Back Home</button>
    //     </div>
    //   </div>
    // );
  }
}

export default ListTest;
