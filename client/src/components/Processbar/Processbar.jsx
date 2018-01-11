import React from 'react';
import vocabulary from '../../vocabulary.json'
import './Processbar.css'

export default ({ current, vocabulary }) => {
  const getCurrentProcess = () => {
    if(current === (vocabulary.length - 1)) return 99
    const process = Math.round((100 * (current + 1))/vocabulary.length) || 1
    return process < 10 ? 10 : process
  }

  return (
  <div id="myProgress">
    <div id="myBar" style={{width: `${getCurrentProcess()}%` }}></div>
  </div>
  )
}
