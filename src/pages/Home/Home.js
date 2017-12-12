import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header title='Home' />
        <button className="Home-intro">Vocabulary</button>
      </div>
    );
  }
}

export default Home;
