import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import BaseUrl from "./mode";

const style={
    cursor:"pointer"
}

const CreateRestaurant = ({state,setstate}) => {

    const {name}=useParams()
    const token = localStorage.getItem("token")
    const [data,setData]=useState({})
    const [file,setFile]=useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    console.log("dt",data.name)
    const handleImage = (e) => {
        setFile(e.target.files[0])
    }

    const handleClick = () => {
        let form_data=new FormData()
        form_data.append("image",file,file.name)
        form_data.append("name",data.name)
        form_data.append("food_type",data.food_type)
        form_data.append("city",data.city)
        form_data.append("address",data.address)
        form_data.append("open_time",data.open_time)
        form_data.append("close_time",data.close_time)
        axios.post(BaseUrl("manager/newrestaurant/"),form_data,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`
            }
        })
     setstate(false)
      
    }
    return(
        <>
         <center>
        <Card sx={{maxWidth:500}}>
            <Typography sx={{textDecoration:"underline"}}>Restaurant Register Page</Typography>
            <Typography sx={{...style,marginLeft:"220px",marginTop:"-20px"}} onClick={()=>setstate(false)}>X</Typography><br/>
            <form>
                <TextField variant="outlined" type="file" name="image" onChange={handleImage}/><br/><br/>
            </form>
                <TextField variant="outlined" type="text" name="name" label="enter your restaurant name" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                <TextField variant="outlined" type="text" name="food_type" label="enter food types" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                <TextField variant="outlined" type="text" name="city" label="enter your city" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                <TextField variant="outlined" type="text" name="address" label="enter your address" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                <TextField variant="outlined" type="time" name="open_time" label="enter open_time" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                <TextField variant="outlined" type="time" name="close_time" label="enter close_time" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
                <Button variant="contained" onClick={handleClick}>Submit</Button><br/><br/>
        </Card>
        </center>
        </>
    )
}
export default CreateRestaurant