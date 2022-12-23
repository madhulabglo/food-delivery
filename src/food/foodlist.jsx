import React,{useState,useEffect} from "react"
import {Badge, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material"
import axios  from "axios"

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

import BaseUrl from "./mode";
import ModalComponent from "./modal";

const FoodList = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [store,setStore]=useState([])
    const [val,setVal]=useState("")
    const [add,setAdd]=useState(1)
    const [collection,setCollection]=useState({})
    const [cart,setCart]=useState([])
    const [open,setOpen]=useState(false)
    const [food,setFood]=useState([])
   

    const apidata = () => {
        axios.get(BaseUrl("food/"))
        .then((response)=>setStore(response.data))
        .catch((error)=>console.log(error))
    }

    const handleWishList = (foods) => {
        setFood(foods)
        setOpen(true)
    }
 
    const handleAdd = () => {
        setAdd(parseInt(add+1))
    }
    const handleSub = () => {
        setAdd(Math.max(add-1,1))
    }
    console.log("collection",collection)

    const handleAddtoCart = (id) => {
        setCollection({"quantity":add,"food":id})
        axios.post(BaseUrl("cart/"),{"quantity":add,"food":id},{
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`
            }
            })
            .then((response)=>setVal(response.data))
            .catch((error)=>console.log(error))
            setOpen(false)

    }

    const data = () => {
        axios.get(BaseUrl("cart/"),{
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`
            }
            })

        .then((response)=>setCart(response.data))
        .catch((error)=>console.log(error))
    }


    const handleShopingIcon = () => {
        navigate(`/cart`)
    }
   
  
  
    useEffect(()=>{
        apidata()
        data()
    },[])

    return(
        <>
        <center>
        <Typography sx={{marginTop:"80px",fontSize:"large",fontWeight:"bold",textDecoration:"underline",color:"white"}}>Food list</Typography>
        {/* <Badge badgeContent={cart.length} color="primary">
        <Typography sx={{marginLeft:"800px"}}><IconButton onClick={handleShopingIcon}><ShoppingCartIcon  sx={{fontSize:"50px",color:"white"}}/></IconButton></Typography>
        </Badge> */}
        
       
        {store.map((elements)=>{
            return(
                <>
                <Card sx={{marginTop:"100px",width:"400px",marginLeft:"100px"}}>
                      <CardMedia sx={{width:"300px",height:"200px"}}
                      component="img"
                      image={elements.image}
                      />
                      <CardContent>
                        <Typography>{elements.name}</Typography>
                      <Typography>{elements.price}</Typography>
                      </CardContent>
                
                      <CardActions disableSpacing>
                          <Button variant="contained" sx={{marginLeft:"150px"}} onClick={()=>handleWishList(elements)}>Cart</Button>
                      </CardActions>
                      
                          <ModalComponent
                          open={open}
                          modalValue={
                              <Card >
                                  <Typography sx={{marginLeft:"200px",cursor:"pointer"}} onClick={()=>setOpen(false)}>X</Typography>
                                  <CardMedia
                                  component="img"
                                  image={food.image}/>
                                  <CardContent>
                                      <Typography>{food.name}</Typography>
                                      <Typography>{food.price}</Typography><br/><br/>
                                     <Typography>Quantity<Badge badgeContent={add}><Button  onClick={handleAdd}>+</Button></Badge>
                                    <Button min="0" onClick={handleSub}>-</Button></Typography> 
                                  </CardContent>
                                  <CardActions>
                                      <Button variant="contained" sx={{marginLeft:"50px"}} onClick={()=>handleAddtoCart(food.id)}>Add to Cart</Button>
                                  </CardActions>
                              </Card>
                          }/>
                  

                </Card>
                </>
            )

        })}
        </center>
        </>
    )
}
export default  FoodList