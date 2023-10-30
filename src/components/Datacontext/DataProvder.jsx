
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from "axios"

const DataContext = createContext(null);
//! local storage mai restrain ka tareeka hai haar ek group and sort ek pair bnaake save kerlo phele hi phir jese
// ! relod hoga useffect chlega or data ko ker lenge local storage ke pair ke according simple

function DataProvder({ children }) {
    const [ticketdata, setTicketData] = useState([]);
    const [userdata, setUserData] = useState([]);
    const [grouping, setGrouping] = useState("status");
    const [sorting, setSorting] = useState("priority");
    const [ordering, setOrdering] = useState("");
    const [finaldata, setData] = useState([]);
    const [userIdtoName, setUserIdToName] = useState({});

    function groupTicketsByPriority(tickets) {
        const groupedTickets = {};

        // Loop through the tickets and group them by priority
        tickets.forEach((ticket) => {
            const priority = ticket.priority;
            if (!groupedTickets[priority]) {
                groupedTickets[priority] = [];
            }
            groupedTickets[priority].push(ticket);
        });

        return groupedTickets;
    }
    function arrangeTicketsByUser(tickets) {
        const arrangedTickets = {};


        tickets.forEach((ticket) => {
            const userId = ticket.userId;
            if (!arrangedTickets[userId]) {
                arrangedTickets[userId] = [];
            }
            arrangedTickets[userId].push(ticket);
        });

        return arrangedTickets;
    }
    function groupTicketsByStatus(tickets) {
        const status=["Backlog","Todo","In progress","Done","Canceled"]
        const groupedTickets = {};
        status.forEach((status) => {
            groupedTickets[status] = [];
          });
        tickets.forEach((ticket) => {
            const status = ticket.status;
            if (!groupedTickets[status]) {
                groupedTickets[status] = [];
            }
            groupedTickets[status].push(ticket);
        });
        
        return groupedTickets;
    }
    const GroupByBases = (tickets, user) => {
        if (grouping === "status") {
            const data = groupTicketsByStatus(tickets);
            setData(data);
            // console.log(data)
        } else if (grouping === "user") {
            const data = arrangeTicketsByUser(tickets);
            setData(data);

            // console.log(data["usr-1"]);
            // console.log(data);
        } else {
            const data = groupTicketsByPriority(tickets);
            setData(data);

        }

    }
   
    const getData = async () => {
        try {
            const result = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
            const ticket = result.data.tickets;
            const users = result.data.users;
            console.log(result.data)
            setTicketData(ticket);
            setUserData(users);
            GroupByBases(ticket, users);
            const object = {};
            users.forEach((user) => {
                object[user.id] = user.name;
            });
            setUserIdToName({...object})
        } catch (e) {
            console.log(e.message, "first fetch ke time error")
        }
        // console.log("ticket",ticket);
        // console.log("users",users);
    }
    useEffect(() => {
        // console.log(ticketdata.length)
        if (ticketdata.length === 0) {
            getData();
        }
        if (ticketdata.length > 0) {
            GroupByBases(ticketdata, userdata);
        }
    }, [grouping]);

    return (
        <DataContext.Provider value={{ ticketdata, setTicketData, userdata, setUserData, finaldata, setGrouping, setSorting, grouping, sorting,setUserIdToName,userIdtoName }}>
            {children}
        </DataContext.Provider>
    )
}
export const useFunctions = () => useContext(DataContext);
export default DataProvder;