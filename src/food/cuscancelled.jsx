import { Card, Typography } from "@mui/material"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"

import BaseUrl from "./mode"

const CustomerCancelledOrders = () => {

    const token = localStorage.getItem("token")
    const [store,setStore]=useState([])

    const apidata = () => {
        axios.get(BaseUrl("/customer/cancelledorders/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            })
    
        .then((response)=>setStore(response.data))
        .catch((error)=>console.log(error))

    }
   
    useEffect(()=>{
        apidata()
    },[])

 
    return(
        <>
        <center>
        {store?.map((el)=>{
             const date = new Date(el.cancell_datetime)
             const formattedDate = date.toLocaleDateString("en-GB", {
                 day: "numeric",
                 month: "long",
                 year: "numeric",
                 hour: '2-digit', minute: '2-digit'
             })
            return(
                <>
                   <Card sx={{marginTop:"100px",width:"500px",marginLeft:"100px"}}>
                       <Typography>ID:{el.id}</Typography>
                       <Typography>TOTAL PRICE:{el.total_price}</Typography>
                       <Typography>CANCELL DATE TIME:{formattedDate}</Typography>


                    </Card>

                </>
            )
        })}
     
       
     </center>
        </>
     
    )
}
export default CustomerCancelledOrders