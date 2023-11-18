import React from 'react'
import './Popup.css';
function Popup(props) {
  return (props.trigger) ? (
    <div className='Popup'>
        <div className='popup-inner'>
            <button className='popup-close' onClick={handleClick}>
                Close
            </button>
            {props.children}
        </div>
    </div>
  ): "";
}

export default Popup