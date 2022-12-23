import { AppBar, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Modal, Toolbar, Typography } from "@mui/material"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


import ModalComponent from "./modal"

import BaseUrl from "./mode"


const RestaurantList = () => {

    const token = localStorage.getItem("token")
    const {name}=useParams()
    const navigate = useNavigate()
    const [datas,setDatas]=useState([])
    const [open,setOpen]=useState(false)
    const [show,setShow]=useState("")
    const [food,setFood]=useState([])
    const [id,setId]=useState("")
    

    const apiData = () => {
        axios.get(BaseUrl("restaurant/"))
        .then((response)=>setDatas(response.data))
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
    const handleRestaurant = (id) => {
        setOpen(true)
        setId(id)
    }
    console.log("d",datas?.map((e)=>e.id))

    console.log(food?.map((e)=>e.restaurant))
    useEffect(()=>{
        apiData()
        foodlist()
    },[])
    return(
        <>
        {datas?.map((ele)=>{
            return(
                <>
                
         
                <Card sx={{width:"400px",marginTop:"100px",marginLeft:"600px"}}>
                    <CardHeader sx={{marginLeft:"100px"}}
                    title={ele.name}
                    />

                    <CardMedia sx={{width:"300px",height:"200px",marginLeft:"60px"}}
                    component="img"
                    image={ele.image}
                    >   
                    </CardMedia>
                    <CardContent sx={{marginLeft:"120px"}}>
                    <Typography sx={{textDecoration:"underline"}}>Restaurant Name</Typography>
          <Typography >{ele.name}</Typography>
          <Typography sx={{textDecoration:"underline"}}>Foods type</Typography>
          <Typography>{ele.food_type}</Typography>
          <Typography sx={{textDecoration:"underline"}}>Address</Typography>
          <Typography>{ele.address}</Typography>
          <Typography>{ele.city}</Typography>
          <Typography sx={{textDecoration:"underline"}}>Timings</Typography>
          <Typography>{ele.open_time}</Typography>
          <Typography>{ele.close_time}</Typography> 
          <Button variant="contained" onClick={()=>handleRestaurant(ele.id)}>our Restaurant Food</Button>
          <ModalComponent
          open={open}
          modalValue={
              <>
              <Typography sx={{textDecoration:"underline"}}>Food list</Typography>
              <Typography sx={{marginLeft:"200px",cursor:"pointer",marginTop:"-20px"}} onClick={()=>setOpen(false)}>X</Typography>
              {food?.filter((elements)=>elements.restaurant === id)?.map((e)=>{
                  return(
                      <Card>
                          <CardMedia
                          component="img"
                          image={e.image}/>
                          <CardContent>
                              <Typography>{e.name}</Typography>
                              <Typography>{e.price}</Typography>
                          </CardContent>
                      </Card>

                  )
              })}
              <br/><br/>
              <Link to ={-1}>Back</Link>
            
              </>
          }/>
                    </CardContent>
                </Card>
                </>
            )
        })}

  
        </>
    )
}
export default RestaurantList