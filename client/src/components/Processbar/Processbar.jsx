import React from 'react';
import vocabulary from '../../vocabulary.json'
import './Processbar.css'

export default ({ current }) => {
  const getCurrentProcess = () => {
    if(current === (vocabulary.words.length - 1)) return 99
    const process = Math.round((100 * (current + 1))/vocabulary.words.length) || 1
    return process < 10 ? 10 : process
  }

  return (
  <div id="myProgress">
    <div id="myBar" style={{width: `${getCurrentProcess()}%` }}></div>
  </div>
  )
}
