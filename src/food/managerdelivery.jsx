import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"

import BaseUrl from "./mode"

const ManagerDelivery  = () => {
    const token = localStorage.getItem("token")
    const [store,setStore]=useState([])
    const [active,setActive]=useState([])
    const [food,setFood]=useState([])

    const apidata = () => {
        axios.get(BaseUrl("/manager/deliveredorders/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            })

        .then((response)=>setStore(response.data))
        .catch((error)=>console.log(error))

    }

    const activeorders = () => {
        axios.get(BaseUrl("/cartlist/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            } 
        })
        .then((response)=>setActive(response.data))
        .catch((error)=>console.log(error))
    }

    const foodlist = () => {
        axios.get(BaseUrl("/food/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            } 
        })
        .then((response)=>setFood(response.data))
        .catch((error)=>console.log(error))
    }

    useEffect(()=>{
        apidata()
        activeorders()
        foodlist()
    },[])
    return(
        <>
        <center>
            <Typography>Manager Delivered Order</Typography><br/><br/>

            {store?.map((elements)=>{
                  const date = new Date(elements.delivered_datetime)
                  const formattedDate = date.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: '2-digit', minute: '2-digit'
                  })
                return(
                    <>
                    {elements?.cart.map((val)=>{
                        return(
                            <>
                            {active?.filter((element)=>element.id === val).map((ele)=>{
                                return(
                                    <>
                                    {food?.filter((el)=>el.id === ele.food).map((e)=>{
                                        return(
                                            <Card sx={{marginTop:"100px",width:"400px",marginLeft:"100px"}}>
                                                <CardMedia  sx={{width:"300px",height:"200px"}}
                                                component="img"
                                                image={e.image}/>
                                                <CardContent>
                                                    <Typography>Name:{ele.name}</Typography>
                                                    <Typography>Quantity:{ele.quantity}</Typography>
                                                    <Typography>Total Price:{ele.price}</Typography>
                                                    <Typography>Delivered date time:{formattedDate}</Typography>
                                                    {elements.is_accepted === true && elements.is_delivered === true ?
                                                    <Typography sx={{color:"green"}}>order successfully delivered!</Typography>:<></>}
                                                </CardContent>

                                            </Card>
                                        )
                                    })}
                                    </>
                                )
                            })}
                            </>
                        )
                    })}
                    </>
                )
            })}
            {/* {store.map((ele)=>{
                    const date = new Date(ele.delivered_datetime)
                    const formattedDate = date.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: '2-digit', minute: '2-digit'
                  })
                return(
                    <Card sx={{marginTop:"100px",width:"500px",marginLeft:"100px"}}>
                      
                            <Typography>ID:{ele.id}</Typography>
                            <Typography>TOTAL PRICE:{ele.total_price}</Typography>
                            <Typography>CREATE DATE TIME:{ele.create_datetime}</Typography>
                            <Typography>ACCEPT DATE TIME:{ele.accept_datetime}</Typography>
                            <Typography>DELIVERED DATE TIME:{formattedDate}</Typography>
                            <Typography>NOTE:{ele.note}</Typography>
                     
                    </Card>
                )
            })} */}
          
        </center>
        </>
    )
}
export default ManagerDelivery