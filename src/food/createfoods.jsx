import { TextField, Typography,FormGroup,FormControlLabel,Checkbox, Button, Card, InputLabel } from "@mui/material"
import axios from "axios"
import React from "react"
import { useState } from "react"

import BaseUrl from "./mode"

const style={
    cursor:"pointer"
}

const CreateFoods = ({state,setstate}) => {

    const token = localStorage.getItem("token")

    const [image,setImage]=useState(null)
    const [store,setStore]=useState({})
    const [organic,setOrganic]=useState(false)
    const [veg,setVeg]=useState(false)

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleOrganic = () => {
        setOrganic(true)
    }

    const handleVeg = () => {
        setVeg(true)
    }

    
    const handleChange = (e) => {
        setStore({...store,[e.target.name]:e.target.value})
    }
    console.log("store",store)

    const handleClick = () => {
        
        let form_data=new FormData()
        form_data.append("image",image,image.name)
        form_data.append("is_organic",organic)
        form_data.append("is_vegan",veg)
        form_data.append("name",store.name)
        form_data.append("price",store.price)
        axios.post(BaseUrl("manager/foods/"),form_data,{
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`
            }
        })
        setstate(false)
        console.log("form",form_data)
      
        }


    return(
        <>
        <center> 
        <Card sx={{maxWidth:500}}>
            <Typography>Add foods</Typography>
            <Typography sx={{...style,marginLeft:"200px",marginTop:"-20px"}} onClick={()=>setstate(false)}>X</Typography><br/>
            <form>
            <TextField variant="outlined" type="file" name="image" label="upload food image"  InputLabelProps={{shrink:true}} onChange={handleImage}/><br/><br/>
            </form>
            <TextField variant="outlined" type="text" name="name" label="enter food name" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
            <TextField variant="outlined" type="text" name="price" label="enter price" InputLabelProps={{shrink:true}} onChange={handleChange}/><br/><br/>
            <FormGroup >
            <InputLabel sx={{marginLeft:"30px"}}>Is_organic &nbsp;&nbsp;<FormControlLabel name="is_organic"control={<Checkbox/>} label="is_organic" onChange={handleOrganic}/></InputLabel>
            <InputLabel sx={{marginLeft:"10px"}}>Is_veg &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FormControlLabel name="is_vegan"  control={<Checkbox />} label="is_vegan" onChange={handleVeg} /></InputLabel>
            </FormGroup><br/>
            <Button variant="contained" onClick={handleClick}>submit</Button><br/><br/>
        </Card>
        </center>
        </>
    )
}
export default CreateFoods