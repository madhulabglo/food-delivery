import { Button, Card, CardActions, CardContent, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"

import BaseUrl from "./mode"

const ManagerActiveOrders = () => {

    const token = localStorage.getItem("token")
    const [store,setStore]=useState([])
    const [accept,setAccept]=useState({"is_accepted":true})
    const [cancel,setCancel]=useState({"is_cancelled":true})
    const [show,setShow]=useState(false)
    const [food,setFood]=useState([])
    const [cart,setCart]=useState([])
    const [profile,setProfile]=useState([])
    const [delivery,setDelivery]=useState([])

    

    const apidata = () => {
        axios.get(BaseUrl("/manager/activeorders/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>setStore(response.data))
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
    const cartlist = () => {
        axios.get(BaseUrl("/cartlist/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>setCart(response.data))
        .catch((error)=>console.log(error))
    }

    const Userprofile = () => {
        axios.get(BaseUrl("/profile/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>setProfile(response.data))
        .catch((error)=>console.log(error))
    }

    const Delivery = () => {
        axios.get(BaseUrl("/manager/deliveredorders/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        .then((response)=>setDelivery(response.data))
        .catch((error)=>console.log(error))
    }



    const handleAccept = (id) => {
        axios.put(BaseUrl(`/manager/accept/${id}/`),accept,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
        setShow(true)
     
    }

    const handleCancel = (id) => {
        axios.put(BaseUrl(`/manager/cancell/${id}/`),cancel,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        })
    }
    console.log(show)


    useEffect(()=>{
        apidata()
        foodlist()
        cartlist()
        Userprofile()
        Delivery()
    },[])
    console.log("id",store.map((el)=>el.cart.map((val)=>val)))
    return(
        <>
        <center>
            <h3>Active orders</h3>
            <Card sx={{marginTop:"100px",width:"1000px",marginLeft:"100px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Food Details</TableCell>
                            <TableCell>Customer Details</TableCell>
                            <TableCell>Conformation</TableCell>
                        </TableRow>
                    </TableHead>
            {store?.map((elements)=>{
                return(
                    <>
                    {elements.cart?.map((val)=>{
                        return(
                            <>
                            {cart?.filter((element)=>element.id === val).map((ele)=>{
                                return(
                                    <>
                                    {food?.filter((el)=>el.id === ele.food)?.map((e)=>{
                                        return(
                                            <>
                                                <TableBody>
                                                <TableRow>
                                            <TableCell>
                                                <CardMedia sx={{width:"50px",height:"100px"}}
                                                component="img"
                                                image={e.image}/>
                                                <CardContent sx={{marginLeft:"70px",marginTop:"-100px"}}>
                                                    <Typography>Name:{e.name}</Typography>
                                                    <Typography>Quantity:{ele.quantity}</Typography>
                                                    <Typography>Total Price:{e.price}</Typography>
                                                </CardContent>
                                            </TableCell>
                                            {profile?.filter((el)=>el.id === elements.customer).map((e)=>{
                                                return(<>
                                               <TableCell>
                                                 <Typography>{e.username}</Typography>
                                                 <Typography>{e.email}</Typography>
                                                 <Typography>{e.profile?.phone_number}</Typography>
                                                 <Typography>{e.profile?.address}</Typography>
                                                 <Typography>{e.profile?.city}</Typography>
                                             </TableCell>

                                             </> )
                                            })}
                                            <TableCell>
                                                {elements.is_accepted === false && elements.is_cancelled === false ?
                                                <>
                                                <Button variant="contained" color="primary" onClick={()=>handleAccept(elements.id)}>Accept</Button>&nbsp;&nbsp;
                                                <Button variant="contained" color="error" onClick={()=>handleCancel(elements.id)}>Cancel</Button>
                                                </>:<></>}
                                                {elements.is_accepted === true && elements.is_cancelled === false?
                                                <>
                                                <Button variant="contained" color="success">accepted</Button>&nbsp;&nbsp;
                                                <Button variant="contained" disabled >Cancel</Button>
                                                </>:<></>}
                                                {elements.is_accepted === false && elements.is_cancelled === true?
                                                <>
                                                <Button variant="contained" color="error" >Cancelled</Button>
                                                </>
                                                :<></>}
                                            </TableCell>
                                            {/* <TableCell>
                                                {delivery?.filter((del)=>del.is_delivered === true)?
                                                <>
                                                <Button variant="contained" sx={{bgcolor:"acqua"}}>Delivered</Button>
                                               
                                                </>:<></>}
                                                {elements.is_accepted === true && elements.is_delivered === false?
                                                <Typography>comming soon! your order delivery</Typography>:<></>}
                                            </TableCell> */}
                                             
                                            

                                            </TableRow>
                                            </TableBody>
                                            </>
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
                return(
                    <>
                    <Card sx={{marginTop:"100px",width:"300px",marginLeft:"100px"}}>
                        <Typography>Total price:{ele.total_price}</Typography>
                        <Typography>Customer:{ele.customer}</Typography>

                    <CardActions disableSpacing>
                        {show?
                        <>
                        <Button variant="contained" color="success" sx={{marginLeft:"200px"}}>Accept</Button>
                        <Button variant="contained" color="error" sx={{marginLeft:"200px"}}>Cancel</Button>
                       </> 
                       :
                        <>
                        <Button variant="contained" sx={{marginLeft:"20px"}} onClick={()=>handleAccept(ele.id)}>Request</Button>
                        <Button variant="contained" sx={{marginLeft:"20px"}} onClick={()=>handleAccept(ele.id)}>Accept</Button>
                        <Button variant="contained" sx={{marginLeft:"20px"}} onClick={()=>handleCancel(ele.id)}>Cancel</Button>
                        </>
                        }
                       
                        
                       
                    </CardActions>
                    </Card>
                    </>
                    
                )
            })} */}
            </Table>
        </Card>
        </center>
        </>
    )
}
export default ManagerActiveOrders