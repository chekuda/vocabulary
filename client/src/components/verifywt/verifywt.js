import React, { Component, Children } from 'react'
import jwtdecode from 'jwt-decode'
import Login from '../../pages/Login/Login'
import { Get } from '../fetchData/fetchData'
import { Redirect } from 'react-router-dom'

export default class Verifytf extends Component{
  constructor(props){
    super(props)
    this.state = {
      authed: false
    }
  }

  componentWillMount(){
    this.checkIfTokenExpired()
  }

  setAuthedInSession(val){
    window.localStorage.setItem('authed', val)
  }

  checkIfTokenExpired(){
    const token = window.localStorage.getItem('user-vocabulary-token')

    if(token) {
      const exp = jwtdecode(token).exp

      if(exp > (new Date().getTime()/1000)){
        this.setAuthedInSession(true)
      } else {
        this.setAuthedInSession(false)
        this.verify(token)
      }
    } else {
      this.verify(token)
      this.setAuthedInSession(false)
    }
  }

  verify(wt){
    Get('/api/verifytoken', {
      method: 'GET',
      headers: {
        'Authentication': `Bearer ${wt}`
      }
    })
    .then(({ success, msg }) => {
      if(success) {
        this.setAuthedInSession(true)
        this.setState({
          authed: true
        })
      } else {
        this.setAuthedInSession(false)
        this.setState({
          authed: false
        })
      }
    })
  }

  render() {
    return this.props.children
  }
}