import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import { Redirect } from 'react-router-dom'
import './Login.css'

export class Login extends Component {
  constructor(){
    super()
    this.state = {
      didLogin: false
    }
  }

  login(){
    if(!this.state.username || !this.state.password) return

    Post('/api/userlogin', { 'Content-Type': 'application/json' }, this.state)
      .then(({ success, token, msg }) => {
        if(!success) {
          alert(`${msg}, Please try again`)
        }
        else {
          window.localStorage.setItem('user-vocabulary-token', token)
          window.localStorage.setItem('authed', true)
          this.setState({ didLogin: true })
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
        { this.state.didLogin && <Redirect to={{ pathname: '/' }}/> }
      </div>
    )
  }
}

export default Login