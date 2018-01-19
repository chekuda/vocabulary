import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { Post } from '../../components/fetchData/fetchData'
import { Redirect } from 'react-router-dom'
import './SignUp.css'

export class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      didsignup: false
    }
  }

  validateEmail(){
    return !!this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  SignUp(){
    if(!this.state.username || !this.state.password) return

    if(this.state.password !== this.state.cpassword) {
      alert('Passwords are different')
      return
    }
    if(!this.validateEmail()) {
      alert('No valid email')
      return
    }

    Post('/api/signup', { 'Content-Type': 'application/json' }, this.state)
      .then(({ success, token, msg, username }) => {
        if(!success) {
          alert(`${msg}, Please try again`)
        }
        else {
          window.localStorage.setItem('user-vocabulary-token', token)
          window.localStorage.setItem('authed', true)
          window.localStorage.setItem('vocabulary-user', username)
          this.setState({ didsignup: true })
        }
      })
  }


  onInputChange({ value }, type) {
    this.setState({ [type]: value })
  }

  addLogiMarkup(){
    return (
      <div className='signup-container'>
        <div className='signup-block'>
          <div className='signup-inputs'>
          <div className='item-input'>
              <input type="text" className="form-control" placeholder="Email Address" onChange={({ target }) => this.onInputChange(target, 'email')}/>
            </div>
            <div className='item-input'>
              <input type="text" className="form-control" placeholder="Username" onChange={({ target }) => this.onInputChange(target, 'username')}/>
            </div>
            <div className='item-input'>
              <input type="password" className="form-control" placeholder="Password" onChange={({ target }) => this.onInputChange(target, 'password')}/>
            </div>
            <div className='item-input cpassword'>
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={({ target }) => this.onInputChange(target, 'cpassword')}/>
            </div>
          </div>
          <div className='signup-button'>
            <button type='button' className="l-button" id='signup' onClick={() => this.SignUp()}>SignUp</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='SignUp'>
        <Header title='SignUp' />
        { this.addLogiMarkup() }
        { this.state.didsignup && <Redirect to={{ pathname: '/' }}/> }
      </div>
    )
  }
}

export default SignUp