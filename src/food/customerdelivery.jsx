import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"
import BaseUrl from "./mode"

const CustomerDelivery = () => {

    const token = localStorage.getItem("token")

    const [store,setStore]=useState([])
    const [cartlist,setCartlist]=useState([])
    const [foodlist,setFoodlist]=useState([])

    const apidata = () => {
        axios.get(BaseUrl("customer/deliveredorders/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>setStore(response.data))
        .catch((error)=>console.log(error))
    }

    const cart = () => {
        axios.get(BaseUrl("/cart/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }

        })
        .then((response)=>setCartlist(response.data))
        .catch((error)=>console.log(error))
    }

    const food = () => {
        axios.get(BaseUrl("/food/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>setFoodlist(response.data))
        .catch((error)=>console.log(error))
    }


    useEffect(()=>{
        apidata()
        cart()
        food()
    },[])
    return(
        <>
        <center>
            <Typography>Customer Delivered Orders</Typography><br/><br/>
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
                            {cartlist?.filter((element)=>element.id === val).map((ele)=>{
                                return(
                                    <>
                                    {foodlist?.filter((el)=>el.id === ele.food).map((e)=>{
                                        return(
                                            <Card sx={{marginTop:"100px",width:"400px",marginLeft:"100px"}}>
                                                <CardMedia  sx={{width:"300px",height:"200px"}}
                                                component="img"
                                                image={e.image}/>
                                                <CardContent>
                                                <Typography>Name:{e.name}</Typography>
                                                <Typography>Quantity:{ele.quantity}</Typography>
                                                <Typography>Total Price:{e.price}</Typography>
                                                <Typography>delivered date time:{formattedDate}</Typography>
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
            {/* {store?.map((ele)=>{
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
                        <Typography>CUSTOMER ID:{ele.customer}</Typography>
                        <Typography>TOTAL PRICE:{ele.total_price}</Typography>
                        <Typography>DELIVERED DATE TIME:{formattedDate}</Typography>
                        <Typography>NOTE:{ele.note}</Typography>
                    </Card>
                )
            })}
            <br/><br/> */}
        </center>
        </>
    )
}
export default CustomerDelivery


