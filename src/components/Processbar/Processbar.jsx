import React from 'react';
import vocabulary from '../../vocabulary.json'
import Processbar from './Processbar.css'

export default ({ current }) => {
  const getCurrentProcess = () => {
    if(current === (vocabulary.words.length - 1)) return 99
    return Math.round((100 * (current + 1))/vocabulary.words.length) || 1
  }

  return (
  <div id="myProgress">
    <div id="myBar" style={{width: `${getCurrentProcess()}%` }}></div>
  </div>
  )
}
