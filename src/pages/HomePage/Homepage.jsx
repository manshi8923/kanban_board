import React, { useEffect, useState } from 'react'
import './Homepage.css'
import Card from '../../components/Cards/Card'
import Loading from '../../components/Loading/Loading';

import * as FaIcons from "react-icons/fa"


const Homepage = () => {
  //state variables
  const [display,setDisplay]=useState(false);
  //function
  const showDisplay=()=>setDisplay(!display);

  const url = " https://api.quicksell.co/v1/internal/frontend-assignment ";

  // array of objects
  const [list,setList]=useState([]);
  const [masterList,setmasterList]=useState([]);
  const [loading,setLoading]=useState(true);
  const [user,setUser]=useState([]);
  const fetchItems=async()=>{
      setLoading(true);
    try{
      const data=await fetch(url);
      const res=await data.json();
      setUser(res.users);
      console.log(res);
      setLoading(false);
      setList(res.tickets);
      setmasterList(res.tickets);
      console.log(list);
      console.log(masterList);
    }
    catch(err){
      setLoading(false);
      console.log(err);
    }
  }

  const group=()=>{
    setList(user);
  }


  useEffect(()=>{
    fetchItems();
  },[]);

  if(loading){
    return(
      <Loading/>
    )
  }
  return (
    <>
    <div className='full'>
    <div className='nav'>
      
    
  
   <button  className ='btn' id='btn1' onClick={showDisplay}>Display <FaIcons.FaBars/></button>
      <div className={display?'display-menu-active' :'display-menu'}>
        <ul className='display-menu-items'>
           <li>Grouping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className ='btn' onClick={()=>group()}>Status</button></li>
           <li>Ordering &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className ='btn'>Priority</button></li>
        </ul>
      </div>
  
   

    </div>
    <div className='display'>
          {list.map((list) => {
            return <Card key={list.id} {...list} />;
          })}
    </div>
    </div>
    </>
  )
}

export default Homepage