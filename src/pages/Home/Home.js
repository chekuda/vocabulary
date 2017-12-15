import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import './Home.css';

class Home extends Component {
  constructor(){
    super()
    this.sections = [{
      name: 'Vocabulary',
      redirect: '/vocabulary'
    },{
      name: 'Update Glossary',
      redirect: '/updateglosary'
    }]
  }

  getSection(){
    return this.sections.map(section => {
      return (
        <div className='section'>
          <a className="Home-intro" href={ section.redirect }>{ section.name }</a>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="Home">
        <Header title='Home' />
       { this.getSection() }
      </div>
    );
  }
}

export default Home;
