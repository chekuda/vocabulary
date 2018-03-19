import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import { Link } from 'react-router-dom'
import './Home.css';

class Home extends Component {
  constructor(){
    super()
    this.sections = [{
      name: 'Vocabulary',
      redirect: '/vocabulary'
    },{
      name: 'Summaries',
      redirect: '/summaries'
    },{
      name: 'Update Glossary',
      redirect: '/updateglosary'
    }]
  }

  getSection(){
    return this.sections.map((section, index) => {
      return (
        <div key={index} className='section'>
          <Link className="Home-intro" to={ section.redirect }>{ section.name }</Link>
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
