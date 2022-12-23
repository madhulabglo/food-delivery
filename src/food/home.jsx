import { Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import axios from "axios"

import BaseUrl from "./mode"

import FoodBankIcon from '@mui/icons-material/FoodBank';
import ModalComponent from "./modal";
import CreateFoods from "./createfoods";
import CreateRestaurant from "./createres";


const style = {
    float: "left",
    marginTop: "20px",
    margin: "10px",
    width: "400px",
    height:"300px",
    backgroundSize:"cover"
    
  };

const Home = () => {

    const [store,setStore]=useState([])
    const [open,setOpen]=useState(false)
    const [view,setView]=useState(false)

    const apidata = () => {
        axios.get(BaseUrl("food/"))
        .then((response)=>setStore(response.data))
        .catch((error)=>console.log(error))
    }

    const handleAddFood = () =>{
        setOpen(true)
    }

    const handleCreateRestaurant = () => {
       setView(true)
    }

    useEffect(()=>{
        apidata()
    },[])
    return(
        <>
        <center>
        <Typography sx={{marginTop:"70px",color:"white"}}><h1>welcome!!:)</h1></Typography>
        <Typography sx={{marginLeft:"1300px",marginTop:"-55px"}}><Button variant="contained" onClick={handleAddFood}>Add Food</Button></Typography>
        <Typography sx={{marginLeft:"950px",marginTop:"-35px"}}><Button variant="contained" onClick={handleCreateRestaurant}>Create Restaurant</Button></Typography><br/><br/>
        {open ?
        <>
        <ModalComponent open={open}
        modalValue ={<CreateFoods state={open} setstate={setOpen}/> }/>
        </>
        :
        <></>}
        {view?
        <>
        <ModalComponent open={view}
        modalValue = {<CreateRestaurant state={view} setstate={setView}/>}/>
        </>
        :
        <></>
       }
       
  
        {store.map((ele)=>{
            return(
                <Card sx={{...style,marginTop:"200px",marginLeft:"350px"}}>
                    <CardMedia sx={{width:"300px",height:"200px"}}
                      component="img"
                      image={ele.image}
                      />
                      <CardContent>
                        <Typography>{ele.name}</Typography>
                        <Typography>{ele.price}</Typography>
                      </CardContent>

                </Card>
            )
        })}
        </center>
        </>
    )
}
export default  Home