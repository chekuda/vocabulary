import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom';

export default ({component: Component, ...rest}) => {
  const authed = window.localStorage.getItem('authed')
  return (
    <Route
      {...rest}
      render={(props) => authed === 'true'
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  )
}