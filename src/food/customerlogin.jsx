import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { Button, Card, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

import BaseUrl from "./mode"

const CustomerLogin = () => {

    const[data,setData]=useState({})
    const [token,setToken]=useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    
    const handleClick = () => {
        axios.post(BaseUrl("login/"),data)
        .then((response)=>setToken(response.data.token))
        .catch((error)=>console.log(error))
    }

    useEffect(()=>{
        if(token !== "" && token !== undefined){
            localStorage.setItem("token",token)
            localStorage.setItem("cusname",data.username)
            navigate(`/foodlist`)


        }
        else{}
    },[token])
    return(
        <>
        <center>
        <Card sx={{maxWidth:500,marginTop:"200px"}}>
        <Typography sx={{textDecoration:"underline"}}>Customer Login Page</Typography><br/><br/>
        <TextField type="text" variant="outlined" label="username" InputLabelProps={{shrink:true}} name="username" value={data.username} onChange={handleChange}/><br/><br/>
        <TextField type="text" variant="outlined" label="password" InputLabelProps={{shrink:true}} name="password" value={data.password} onChange={handleChange}/><br/><br/>
        <Button onClick={handleClick} variant="contained">Login</Button>
        </Card>
        </center>
        </>
    )
}
export default CustomerLogin