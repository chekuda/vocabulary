import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import Processbar from '../../components/Processbar/Processbar.jsx'
import { Get } from '../../components/fetchData/fetchData'
import './Vocabulary.css';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      listOfWords: [],
      current: 0,
      buttonState: 'Check',
      answer: '',
      sentenceExample: '',
      resultColor: ''
    }
    this.listOfAnswers = []
  }

  componentWillMount(){
    Get('http://backenvocabulary.herokuapp.com/api/getvocabulary/vocabulary')
      .then(res => this.setState({ listOfWords: this.suffleTheArray(res) }))
  }

  suffleTheArray(vocabulary) {
    if(!vocabulary) return []

    return vocabulary.words.sort(() => Math.random() * 2 - 1);
  }

  onInputChange(value, type){
    if(type === 'answer'){
      this.setState({ answer: value })
    } else {
      this.setState({ sentenceExample: value })
    }
  }

  getTestMarkup(){
    const { current, listOfWords } = this.state
    const currentWord = listOfWords[current]

    return (
      <div className='center-section'>
        <div className='test-section'>
          <div className='mainWord-word'>
            <div className='title'>Word to translate</div>
            <div className='word'>{ currentWord.wordinEnglish }</div>
          </div>
          <div className='mainWord-word'>
            <div className='title'>Translation</div>
            <input className='translation-input' type='text' onChange={({ target }) => this.onInputChange(target.value, 'answer')} value={ this.state.answer }/>
          </div>
        </div>
        <div className='sentence-example'>
        <div className='title'>Write a sentence with this word</div>
          <input className='sentence' onChange={({ target }) => this.onInputChange(target.value, 'sentenceExample')} value={ this.state.sentenceExample }/>
        </div>
      </div>
    )
  }

  setAnswerObject(isRightAnswer){
    const { listOfWords, current, sentenceExample, answer } = this.state

    return {
      ...listOfWords[current],
      date: new Date().toISOString().split('T')[0],
      correct: isRightAnswer,
      sentenceExample,
      answer
    }
  }

  moveToNextStep() {
    if(this.state.current === (this.state.listOfWords.length - 1)) {
      sessionStorage.setItem('testResult', JSON.stringify(this.listOfAnswers))
      window.location.href = '/thanks'
    } else {
      this.setState({
        current: this.state.current + 1,
        buttonState: 'Check',
        answer: '',
        sentenceExample: '',
        resultColor: ''
        })
    }
  }

  displayResult() {
    const { definition = {} } = this.listOfAnswers[this.listOfAnswers.length - 1]

    return (
      <ul>
       { Object.keys(definition).map((ele, index) => definition[ele] && <li key={index}><strong>{ ele }</strong>{`: ${definition[ele]}`}</li>)}
      </ul>
    )
  }

  checkAnswer() {
    if(!this.state.answer || !this.state.sentenceExample) return

    const { listOfWords, current } = this.state
    const currentWord = listOfWords[current]
    const answerIsinDefinition = Object.keys(currentWord.definition).reduce((acc, prop) => currentWord.definition[prop].includes(this.state.answer.toLocaleLowerCase()) ? acc + 1 : acc, 0)
    const isRightAnswer = answerIsinDefinition > 0

    this.setState({ resultColor: isRightAnswer ? 'green' : 'red' })
    this.setState({ buttonState: 'Next' })
    this.listOfAnswers.push(this.setAnswerObject(isRightAnswer))
    console.log(this.listOfAnswers)
  }

  render() {
    return (
      <div className="Home">
        <Header title='Vocabulary' />
        { this.state.listOfWords.length > 0 && <Processbar current={this.state.current}/> }
        { this.state.listOfWords.length > 0 && this.getTestMarkup() }
        <div className='result'>
        { this.state.answer && this.state.resultColor &&
          <div className={ this.state.resultColor }>{ this.displayResult() }</div>
        }
        </div>
        <button
          className="check-button"
          onClick={ () => this.state.buttonState === 'Check' ? this.checkAnswer() : this.moveToNextStep() }>{ this.state.buttonState }</button>
      </div>
    );
  }
}

export default Home;
