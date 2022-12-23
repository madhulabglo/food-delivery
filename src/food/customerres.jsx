import React from "react"
import { TextField, Typography,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Checkbox,FormGroup, Button, Card,InputAdornment,IconButton} from "@mui/material"
import { useState } from "react"
import axios from "axios"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import BaseUrl from "./mode"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"

const CustomerRegistration = ({state,setstate}) => {

    const navigate = useNavigate()
    const fieldRef = useRef({})
    const [store,setStore]=useState({})
    const [data,setData]=useState({})
    const [datas,setDatas]=useState({address:"",city:""})
    const [passwordshow,setPasswordshow]=useState(false)
 

    const handleChange = (e) => {
        setStore({...store,[e.target.name]:e.target.value})
    }

    const handleChanges = (e) => {
        setDatas({...datas,[e.target.name]:e.target.value})
    }
    console.log("data",datas)
   console.log("store",store)

    const handleClick = () => {
      
        axios.post(BaseUrl("register/"),{...store,"profile":datas})
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error))
        setstate(false)
        navigate('/login')
    }
    return(
        <>
         <center>
        <Card sx={{maxWidth:500,marginTop:"50px"}}>
        <Typography sx={{textDecoration:"underline"}}>Customer Register Page</Typography>
        <Typography sx={{marginLeft:"250px",marginTop:"-30px"}}><Button onClick={()=>setstate(false)}>X</Button></Typography><br/>
        <TextField type="text" variant="outlined" label="username" InputLabelProps={{shrink:true}} name="username" value={store.username} onChange={handleChange} /><br/><br/>
        <TextField type={passwordshow?"text":"password"} variant="outlined" label="password" InputLabelProps={{shrink:true}} name="password" onChange={handleChange} value={store.password} sx={{width:250}}
         InputProps={{
            endAdornment:(<InputAdornment position="end">
            <IconButton onClick={()=>setPasswordshow(!passwordshow)}>
            {passwordshow ? <VisibilityIcon/>:<VisibilityOffIcon/>}
            </IconButton>
            </InputAdornment>
        )
    }}/><br/><br/>
        <TextField type="text" variant="outlined" label="first_name" InputLabelProps={{shrink:true}} name="first_name" value={store.first_name} onChange={handleChange}/><br/><br/>
        <TextField type="text" variant="outlined" label="last_name" InputLabelProps={{shrink:true}} name="last_name" value={store.last_name} onChange={handleChange}/><br/><br/>
        <TextField type="email" variant="outlined" label="Email" InputLabelProps={{shrink:true}} name="email" value={store.email} onChange={handleChange}/><br/>
        <Typography sx={{fontWeight:"bold"}}>profile</Typography><br/>
        <TextField type="text" variant="outlined" label="address" InputLabelProps={{shrink:true}} name="address" value={data.address} onChange={handleChanges} /><br/><br/>
        <TextField type="text" variant="outlined" label="phone number" InputLabelProps={{shrink:true}} name="phone_number" value={data.phone_number} onChange={handleChanges}/><br/><br/>
        <TextField type="text" variant="outlined" label="city" InputLabelProps={{shrink:true}} name="city" value={data.city} onChange={handleChanges}/><br/><br/>
        <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup name="gender"  onChange={handleChanges}>
        <FormControlLabel value="F" control={<Radio />} label="Female"  />
        <FormControlLabel value="M" control={<Radio />} label="Male" />
        </RadioGroup>
        </FormControl><br/>
        <Button onClick={handleClick} variant="contained">submit</Button>
        </Card>
        </center>
        </>
    )
}
export default CustomerRegistration