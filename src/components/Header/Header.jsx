import React from 'react';
import './Header.css'

export default ({ title }) => {
  return (
    <div className="Header">
      <header className="Header-header">
        <h1 className="Header-title">{ title }</h1>
      </header>
    </div>
  )
}
