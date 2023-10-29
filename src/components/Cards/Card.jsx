import React from 'react'
import './Card.css'
import { FaUserTag } from 'react-icons/fa'
const Card = ({id,title,tag}) => {
   let t=title;
  //  if(t.length>70){
  //   t=title.substring(0,70)+"...";
  //  }
  return (
    <>
    <div className='card'>
        <div className='h5'>
            <h5>{id}</h5>
        </div>
        
        <div className='para'>
            <p>{title}</p>
        </div>
        <div className='feature'>
            {tag}
        </div>
    </div>
    </>
  )
}

export default Card