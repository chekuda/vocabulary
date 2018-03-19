import React, { Component } from 'react';
import Header from '../../components/Header/Header.jsx'
import { Link } from 'react-router-dom'
import './ErrorPage.css'

export default class Home extends Component {
  render() {
    return (
      <div className="Error">
        <Header title='ERROR' />
          <div className="error-container">
            <div><i className="fa fa-frown-o" aria-hidden="true"></i></div>
            <div className="errorText">!Ups Something Went Wrong</div>
          </div>
        <div className='button-section error'>
          <Link className='main-button' to='/'>Back Home</Link>
        </div>
      </div>
    )
  }
}
