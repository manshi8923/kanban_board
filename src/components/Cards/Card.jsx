import React from 'react'
import './Card.css'
import { FaUserTag } from 'react-icons/fa'
const Card = ({id,title,tag,priority}) => {
   let t=title;
   if(t.length>60){
    t=title.substring(0,60)+"...";
   }
  return (
    <>
    <div className='card'>
        <div className='h5'>
            <h5>{id}</h5>
        </div>
        
        <div className='para'>
            <p>{t}</p>
        </div>
        <div className='feature'>
             <div className='dot'>...</div>
             <div className='tag'>
                <div className='circle'></div>
             <div>{tag}</div>
             </div>
        </div>
    </div>
    </>
  )
}

export default Card