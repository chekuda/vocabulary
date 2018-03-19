import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
  constructor(props){
    super(props)

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.hanndleOutSideClick = this.hanndleOutSideClick.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keyup', this.handleKeyUp, false)
    document.addEventListener('click', this.hanndleOutSideClick, false)
  }

  componentWillUnmount(){
    window.removeEventListener('keyup', this.handleKeyUp, false)
    document.removeEventListener('click', this.hanndleOutSideClick, false)
  }

  handleKeyUp(event){
    const { oncloseRequest } = this.props

    const keys = {
      //ESC ASCI NUMBER 27
      27: () => {
        event.preventDefault()
        oncloseRequest()
        window.removeEventListener('keyup', this.handleKeyUp, false)
      }
    }

    if(keys[event.keyCode]) keys[event.keyCode]()
  }

  hanndleOutSideClick(event){
    const { oncloseRequest } = this.props

    if(!this.modal.contains(event.target)){
      oncloseRequest()
      document.removeEventListener('click', this.hanndleOutSideClick, false)
    }
  }


  render() {
    const {
      oncloseRequest,
      title,
      body,
      acceptButton = {},
      closeButton = {},
    } = this.props

    return(
      <div className='modalOverlay'>
        <div className='modal'>
          <div className='modalContent' ref={ node => (this.modal = node) }>
            { title && <div className='modal-title'>{ title }</div> }
            { body && <div className='modal-body'>{ body }</div> }
            <div className='modal-footer'>
            { acceptButton.enabled &&
              <button
                type='button'
                className='modal-button'
                style={{ background: acceptButton.background }}
                onClick={() => oncloseRequest(acceptButton.text)}>
                { acceptButton.text }
              </button>
            }
            { closeButton.enabled &&
              <button
                type='button'
                className='modal-button'
                style={{ background: closeButton.background }}
                onClick={() => oncloseRequest(closeButton.text)}>
                { closeButton.text }
              </button>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
