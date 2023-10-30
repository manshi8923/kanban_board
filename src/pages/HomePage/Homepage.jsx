import React, { useEffect, useState } from 'react'
import './Homepage.css'
import Card from '../../components/Cards/Card'
import Loading from '../../components/Loading/Loading';
import { useFunctions } from '../../components/Datacontext/DataProvder';
import UserDropdown from './UserDropdown';
import SortDropdown from './SortDropdown';
import {FaAngleDown,FaRegListAlt} from "react-icons/fa";



import { TbUrgent } from "react-icons/tb";
import { FaSignal } from "react-icons/fa";
import { BiDotsHorizontalRounded, BiSignal2, BiSignal4 } from "react-icons/bi";
import { BsPersonCircle, BsCircle } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { RiRestTimeFill } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { GiProgression } from "react-icons/gi";

//! group on bases of users kerna pjele


const Homepage = () => {
  //state variables
  const { finaldata, sorting,grouping,userIdtoName} = useFunctions();
  const [display, setDisplay] = useState(true);
  const showDisplay = () => setDisplay(!display);
  const [isGroup, setGroup] = useState(false);
  const [issort, setSort] = useState(false);
  const url = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [list, setList] = useState([]);
  const [masterList, setmasterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await fetch(url);
      const res = await data.json();
      setUser(res.users);
      setLoading(false);
      setList(res.tickets);
      setmasterList(res.tickets);
    }
    catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  useEffect(() => {
    fetchItems();
  }, []);
  if (loading) {
    return (
      <Loading />
    )
  }
  const object = ["No priority", "Urgent", "High", "Medium", "Low"];
  const logos = [<BiDotsHorizontalRounded size={15} />, <TbUrgent size={15} />, <FaSignal size={15} />, <BiSignal4 size={20} />, <BiSignal2 size={20} />];
  console.log(userIdtoName)
  const type = {
    Todo: <BsCircle />,
    "In progress": <GiProgression />,
    Done: <IoMdDoneAll />,
    Backlog: <RiRestTimeFill />,
    Canceled: <ImCancelCircle />
  }
  const sortingBases = (a, b) => (sorting === "priority" ? (a.priority - b.priority) : (a.title.localeCompare(b.title)))
  return (
    <>
      <div className='full'>
        <div className='nav'>
          <button className='btn1' onClick={showDisplay}><FaRegListAlt id='icon'/>&nbsp;Display <FaAngleDown id='icon'/> </button>
          <div className="menu-sub-main">
            <div className={display ? 'display-menu-active' : 'display-menu'}>
              <ul className='display-menu-items'>
                <li>Grouping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className='btn2' onClick={() => (setGroup(prev => !prev), setSort(false))}>Status <FaAngleDown/></button></li>
                <li>Ordering &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className='btn2'  onClick={() => (setSort(prev => !prev), setGroup(false))}>Priority <FaAngleDown/></button></li>
              </ul>
            </div>
            <div className='sub-menu'>
              {!display && isGroup && <UserDropdown />}
              {!display && issort && <SortDropdown />}
            </div>
          </div>


        </div>
        <div className='display' style={{ display: "grid" }}>
          {
            Object.keys(finaldata).map(key => (
              <ul>
                <li className='prior'>
                  {grouping === "priority" ? (logos[key]) : (grouping === "user" ? <BsPersonCircle /> : type[key])}&nbsp;&nbsp;
                  {grouping === "priority" ? object[key] : (grouping === "user") ? userIdtoName[key] : key} 
                  
                  <span className='small'>{finaldata[key].length} &nbsp;+</span><span className='add'>...</span></li>
                {
                  finaldata[key].sort((a, b) => sortingBases(a, b)).map((ele, index) => (
                    <li>

                      <Card {...ele} key={index} />
                    </li>
                  ))
                }
              </ul>

            ))
          }
        </div>
      </div>
    </>
  )
}

export default Homepage