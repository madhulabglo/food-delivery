import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"

import BaseUrl from "./mode"

const CustomerActiveOrders = () => {

    const token = localStorage.getItem("token")
    const [store,setStore]=useState([])
    const [cartlist,setCartlist]=useState([])
    const [foodlist,setFoodlist]=useState([])
    const [cancel,setCancel]=useState({"is_cancelled":true})
    const [delivery,setDelivery]=useState({"is_delivered":true})

    const apidata = () => {
        axios.get(BaseUrl("/customer/activeorders/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            })

        .then((response)=>setStore(response.data))
        .catch((error)=>console.log(error))

    }
    console.log("store",store)

    const handleCancel = (id) => {
        axios.put(BaseUrl(`customer/cancell/${id}/`),cancel,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error))

    }

    const handleDelivery = (id) => {
        axios.put(BaseUrl(`/customer/approvedelivered/${id}/`),delivery,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>console.log(response.data))
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

    const active = store.map((el)=>el.cart)
    console.log("active",active)

    // console.log("a",cart.filter((ele,index)=>ele.id == parseInt(active[index])))


    useEffect(()=>{
        apidata()
        cart()
        food()
    },[])
 
    return(
        <>
        <center>
        <Typography >Customer Active orders</Typography><br/><br/>
     
            {store?.map((elements)=>{
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
                                            <CardMedia sx={{width:"300px",height:"200px"}}
                                            component="img"
                                            image={e.image}/>
                                            <CardContent>
                                                <Typography>Name:{e.name}</Typography>
                                                <Typography>Quantity:{ele.quantity}</Typography>
                                                <Typography>Total Price:{e.price}</Typography>
                                            </CardContent>
                                           
                                                {elements.is_accepted === false && elements.is_cancelled === false?
                                                <>
                                                <Typography sx={{color:"orange"}}>waiting for conformation!</Typography><br/>
                                                <Button variant="contained" color="error" onClick={()=>handleCancel(elements.id)}>Cancell</Button><br/><br/>
                                                </>:<></>}
                                                {elements.is_accepted === true && elements.is_cancelled === false?
                                                <>
                                                <Typography sx={{color:"green"}}>your order accepted!</Typography><br/>
                                                <Button variant="contained" color="secondary" onClick={()=>handleDelivery(elements.id)}>Delivered</Button><br/><br/>
                                                </>:<></>}
                                                {elements.is_accepted === false && elements.is_cancelled === true?
                                                <>
                                                <Typography sx={{color:"red"}}>sorry! your order cancelled</Typography><br/>
                                                </>:
                                                <></>}
                                       
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

       



        {/* <Card sx={{marginTop:"100px",width:"200px",marginLeft:"100px"}}>
        <>
        {store.map((ele)=>{
            return(
                <>
                {cart.filter((el)=>el.id === parseInt(ele.id)).map((e)=>{
                    return(
                        <>
                        <Typography>{e.id}</Typography>
                        <Typography>{e.quantity}</Typography>
                        <Typography>{e.name}</Typography>
                        <Typography>{e.resname}</Typography>
                        <Typography>{e.price}</Typography>
                        </>
                    )
                })}
                </>
            )
        })}
        </>
        </Card>
        <br/><br/>
        {cart.filter((ele)=>ele.id === parseInt(active)).map((el)=>{
            return(
                <Card  sx={{marginTop:"100px",width:"200px",marginLeft:"100px"}}>
                    <Typography>{el.id}</Typography>
                    <Typography>{el.quantity}</Typography>
                    <Typography>{el.name}</Typography>
                    <Typography>{el.resname}</Typography>
                    <Typography>{el.price}</Typography>
                    
                </Card>
            )
        })} 
         {store.map((ele)=>{
            return(
                <>
                <Card sx={{marginTop:"100px",width:"200px",marginLeft:"100px"}}>
                    <CardContent>
                    <Typography>ID:{ele.id}</Typography>
                    <Typography>Total price:{ele.total_price}</Typography>
                    </CardContent>
                    <CardActions>
                        {ele.is_accepted === true && ele.is_cancelled === false ?
                        <>
                        <Typography>your order accepted</Typography>
                        <Button variant="contained" onClick={()=>handleDelivery(ele.id)}>delivered</Button>
                        </>
                        :<></>}
                        {ele.is_accepted === false && ele.is_cancelled === true ?
                        <Typography>sorry! your order cancelled</Typography>:<></>}
                        {ele.is_accepted === false && ele.is_cancelled === false?
                        <Typography>waiting for conformation</Typography>:<></>}
                        <Button variant="contained" onClick={()=>handleCancel(ele.id)} >cancel</Button>
                    </CardActions>
                </Card>
                <br/><br/>
                </>
            )
        })} */}
        </center>
        </>
    )
}
export default CustomerActiveOrders