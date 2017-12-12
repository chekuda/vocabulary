import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import vocabulary from '../../vocabulary.json'
import './Vocabulary.css';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      listOfWords: vocabulary.words,
      current: 0,
      buttonState: 'Check',
      answer: '',
      textArea: '',
      resultColor: ''
    }
    this.listOfAnswers = []

  }

  onInputChange(value, type){
    if(type === 'answer'){
      this.setState({ answer: value })
    } else {
      this.setState({ textArea: value })
    }
  }

  getcurrentMarkupText(){
    const { current, listOfWords } = this.state
    const currentWord = listOfWords[current]

    return (
      <div className='center-part'>
        <div className='test-part'>
          <div className='mainWord-word'>
            <div className='title-mainword'>Word to translate</div>
            <div className='word'>{ currentWord.wordinEnglish }</div>
          </div>
          <div className='mainWord-word'>
            <div className='title-mainword'>Translation</div>
            <input className='translation-input' type='text' onChange={({ target }) => this.onInputChange(target.value, 'answer')} value={ this.state.answer }/>
          </div>
        </div>
        <div className='write-example'>
        <div className='title-mainword'>Write a sentence with this word</div>
          <textarea rows='3' onChange={({ target }) => this.onInputChange(target.value, 'textArea')} value={ this.state.textArea }></textarea>
        </div>
      </div>
    )
  }

  getAnswerObject(isRightAnswer){
    const { listOfWords, current, textArea, answer } = this.state

    return {
      ...listOfWords[current],
      date: new Date(),
      correct: isRightAnswer,
      textArea,
      answer
    }
  }

  resetToMoveToNextStep() {
    if(this.state.buttonState === 'Check') {
      this.setState({ buttonState: 'Next' })
    } else {
      this.setState({
        current: this.state.current + 1,
        buttonState: 'Check',
        answer: '',
        textArea: '',
        resultColor: ''
       })
    }
  }

  displayResult() {
    const { definition = {} } = this.listOfAnswers[this.listOfAnswers.length - 1]

    return (
      <ul>
        { Object.keys(definition).map(ele => definition[ele] && <li>{`${ele}: ${definition[ele]}`}</li>)}
      </ul>
    )
  }

  checkAnswer() {
    if(!this.state.answer || !this.state.textArea) return

    const { listOfWords, current } = this.state
    const currentWord = listOfWords[current]
    const answerIsinDefinition = Object.keys(currentWord.definition).reduce((acc, prop) => currentWord.definition[prop].includes(this.state.answer) ? acc + 1 : acc, 0)
    const isRightAnswer = answerIsinDefinition > 0

    this.setState({ resultColor: isRightAnswer ? 'green' : 'red' })
    this.listOfAnswers.push(this.getAnswerObject(isRightAnswer))
    this.resetToMoveToNextStep()
  }

  render() {
    return (
      <div className="Home">
        <Header title='Vocabulary' />
        { this.getcurrentMarkupText() }
        <div className='result'>
        { this.state.answer && this.state.resultColor &&
          <div className={ this.state.resultColor }>{ this.displayResult() }</div>
        }
        </div>
        <button className="check-button" onClick={ () => this.checkAnswer() }>{ this.state.buttonState }</button>
      </div>
    );
  }
}

export default Home;
