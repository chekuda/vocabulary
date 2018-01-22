import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import { ListGroup, ListGroupItem, Collapse, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { Post } from '../../components/fetchData/fetchData'
import { Link } from 'react-router-dom'
import './Summaries.css';

class Summaries extends Component {
  constructor(props){
    super(props)
    this.user = window.localStorage.getItem('vocabulary-user') || ''
    this.state = {
      collapse: -1,
      listOfQuiz: []
    }
  }

  componentWillMount(){
    Post('/api/getlistofquiz', { 'Content-Type': 'application/json' },  { user: this.user })
      .then(({ listOfQuiz }) => this.setState({ listOfQuiz }))
  }

  displayResults(results){
    return results.map((answer, i) => {
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

  toggle(index) {
    if(this.state.collapse === index){
      this.setState({ collapse: -1 })
    } else{
      this.setState({ collapse: index })
    }
  }

  getOveralResults(results){
    const rightAnswers = results.reduce((acc, answer) => answer.correct ? ++acc : acc, 0)
    return `${rightAnswers}/${results.length}`
  }

  getCurrentColor(results){
    const rightAnswers = results.reduce((acc, answer) => answer.correct ? ++acc : acc, 0)
    const percentage = (rightAnswers*100)/results.length

    if(percentage < 33) {
      return 'danger'
    } else if(percentage > 66) {
      return 'success'
    } else {
      return 'warning'
    }
  }

  getMarkUpList(){
    const { listOfQuiz } = this.state
    console.log(listOfQuiz)
    return (
      <ListGroup>
        {
          listOfQuiz.map((element, index) => {
            const date = new Date(parseInt(element.date, 10)).toDateString()
            const currentListColor = this.getCurrentColor(element.answers)

            return (
              <div key={index}>
                <ListGroupItem onClick={() => this.toggle(index)} color={ currentListColor }>
                  <ListGroupItemHeading>{ date }</ListGroupItemHeading>
                  <ListGroupItemText>Rights: { this.getOveralResults(element.answers) }</ListGroupItemText>
                </ListGroupItem>
                <Collapse isOpen={this.state.collapse === index}>
                  { this.displayResults(element.answers) }
                </Collapse>
              </div>
            )
          })
        }
      </ListGroup>
    )
  }

  render() {
    return (
      <div className="Summaries">
        <Header title='Summaries'/>
        { this.state.listOfQuiz.length > 0 &&  this.getMarkUpList() }
        <div className='button-section'>
          <Link className='main-button' to='/'>Back Home</Link>
        </div>
      </div>
    );
  }
}

export default Summaries;
