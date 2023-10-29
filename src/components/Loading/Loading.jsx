import React from 'react'
import './Loading.css'
import loading from "../../assets/spinner.gif"
const Loading = () => {
  return (
    <div className='img'>
        <img src={loading} alt='loading'/>
    </div>
  )
}

export default Loading