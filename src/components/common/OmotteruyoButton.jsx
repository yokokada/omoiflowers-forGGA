import React from 'react'
import './OmotteruyoButton.css'

const OmotteruyoButton = ({ onClick }) => {
  return (
    <button className='omotteruyobotton' onClick={() => {
        console.log("Button clicked!");
        onClick();
      }}>
        omo<br/>ってるよ！
      </button>
  )
}

export default OmotteruyoButton

