import { Button, Card, CardActions, CardContent, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ModalComponent from "./modal"

import BaseUrl from "./mode"

const Cart = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [store,setStore]=useState([])
    const [val,setVal]=useState({})
    const [show,setShow]=useState("")
    const [food,setFood]=useState([])
    const [order,setOrder]=useState(false)
    const [edit,setEdit]=useState(false)
    const [quantity,setQuantity]=useState({})
    const [data,setData] = useState([])
 

    const apidata = () => {
        axios.get(BaseUrl("/cart/"),{
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

    const handleOrderNow = () => {
        setOrder(true)
    }

    const handleChange = (e) => {
        setShow(e.target.value)
    }
    console.log("show",show)
    const handleOrder = (id) => {
        console.log("order",id)
        axios.post(BaseUrl("customer/neworder/"),{"note":show,"cart":id},{
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`
            }
            })

            .then((response)=>setVal(response.data))
            .catch((error)=>console.log(error))
            setOrder(false)
    }
    const handleQuantity = (e) => {
        setQuantity({...quantity,[e.target.name]:e.target.value})
    }

    const handleEdit = (el) => {
        setEdit(true)
        setData(el)
        setQuantity({food:el.food,quantity:el.quantity})

    }
    console.log("quan",data)


    const handleUpdate = () => {
        // console.log("ele",elements.id)
        // const body = {food:food}
        axios.put(BaseUrl(`/cart/${data.id}/`),quantity,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            })

        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error))
    }

    const handleRemove = (id) => {
        axios.delete(BaseUrl(`/cart/${id}/`),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            })

        .then((response)=>{console.log(response.data)
        apidata()})
        .catch((error)=>console.log(error))
    }


    useEffect(()=>{
        apidata()
        foodlist()
    },[])
    return(
        <>
<center>
    <Typography>Cart page</Typography><br/><br/>
    <Card sx={{marginTop:"50px",width:"800px",marginLeft:"100px"}}>
    <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Food List</TableCell>
                    <TableCell>Restaurant Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Order</TableCell>
                </TableRow>
            </TableHead>      
        {store?.map((elements)=>{
            return(
                <>
                {food.filter((element)=>element.id === elements.food).map((ele)=>{
                    return(
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                        <CardMedia sx={{width:"50px",height:"100px"}}
                                        component="img"
                                        image={ele.image}/>
                                        <CardContent>
                                            <Typography sx={{marginLeft:"-30px"}}>Name:{elements.name}</Typography>
                                            <Typography sx={{marginLeft:"-30px"}}><Button onClick={()=>handleEdit(elements)}>Edit</Button></Typography>
                                            <Typography sx={{marginLeft:"40px",marginTop:"-35px"}}><Button onClick={()=>handleRemove(elements.id)}>Remove</Button></Typography>
                                        </CardContent>
                                </TableCell>
                                <TableCell>{elements.resname}</TableCell>
                                <TableCell>{elements.quantity}</TableCell>
                                <TableCell>{elements.price}</TableCell>
                                <TableCell><Button variant="contained" onClick={handleOrderNow}>Order</Button></TableCell>
                            </TableRow>
                            <ModalComponent
                            open={order}
                            modalValue={
                                <>
                                <Typography sx={{textDecoration:"underline"}}>Enter your order</Typography>
                                <Typography sx={{marginLeft:"200px",cursor:"pointer"}} onClick={()=>setOrder(false)}>X</Typography><br/>
                                <TextField variant="outlined" label="note" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                                <Button variant="contained" onClick={()=>handleOrder(elements.id)}>order now</Button>
                                </>
                            }/>
                            <ModalComponent
                                open={edit}
                                modalValue={   
                                <>
                                <Typography sx={{marginLeft:"200px",cursor:"pointer"}} onClick={()=>setEdit(false)}>X</Typography><br/>
                                {food?.filter((food)=>food.id === data.food ).map((e)=> {
                                         return(
                                            <>
                                             <CardMedia
                                    component="img"
                                    image={e.image}/>
                                            </>
                                        )
                                })
                               
                                }
                                <CardContent>
                                <Typography>Name:{data.name}</Typography>
                                <Typography>Price:{data.price}</Typography>
                                <Typography>Quantity:{data.quantity}</Typography>
                                <TextField variant="outlined" type="text" name="quantity" value={quantity.quantity}  onChange={handleQuantity} /><br/><br/>
                                <Button variant="contained"  onClick={()=>handleUpdate()} >Update</Button>
                                </CardContent>
                                </>
                                
                             
                            }/>
                       
                        </TableBody>
                    )
                })}
                </>
            )
        })}
    </Table>
  
    </Card>
        {/* {store?.map((elements)=>{
            return(
                <>
                <Card sx={{marginTop:"100px",width:"400px",marginLeft:"100px"}}>
                    <CardContent>
                        <Typography>Restaurant name:{elements.resname}</Typography>
                        <Typography>Quantity:{elements.quantity}</Typography>
                        <Typography>Price:{elements.price}</Typography>
                        <Typography>food:{elements.name}</Typography>
                    </CardContent>
                <CardActions disableSpacing>
                    <TextField variant="outlined" label="note" InputLabelProps={{shrink:true}} onChange={handleChange}/>
                    <Button variant="contained" onClick={()=>handleOrder(elements.id)}>order now</Button>
                </CardActions>

                </Card>
                </>
            )
        })} */}
       </center>
        </>
    )
}
export default Cart