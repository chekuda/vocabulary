import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import './Login.css'

export default class UpdateGlosary extends Component {
  login(){
    if(!this.state.username || !this.state.password) return

    Post('/api/userlogin', { 'Content-Type': 'application/json' }, this.state)
      .then(({ success, token, msg }) => {
        if(!success) {
          alert(`${msg}, Please try again`)
        }
        else {
          window.sessionStorage.setItem('user-vocabulary-token', token)
          window.location.href = '/'
        }
      })
  }


  onInputChange({ value }, type) {
    this.setState({ [type]: value })
  }

  addLogiMarkup(){
    return (
      <div className='login-container'>
        <div className='login-block'>
          <div className='login-inputs'>
            <div className='item-input'>
              <input type="text" className="form-control" placeholder="Email Address" onChange={({ target }) => this.onInputChange(target, 'username')}/>
            </div>
            <div className='item-input'>
              <input type="password" className="form-control" placeholder="Password" onChange={({ target }) => this.onInputChange(target, 'password')}/>
            </div>
          </div>
          <div className='login-button'>
            <button type='button' className="l-button" id='login' onClick={() => this.login()}>Login</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='login'>
        <Header title='Login' />
        { this.addLogiMarkup() }
      </div>
    )
  }
}