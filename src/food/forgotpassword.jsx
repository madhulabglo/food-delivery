import { Button, Card, TextField, Typography,InputAdornment,IconButton } from "@mui/material"
import axios from "axios"
import React,{useState} from "react"
import ModalComponent from "./modal"
import BaseUrl from "./mode"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom"

const Forgotpassword = () => {

    // const token = localStorage.getItem("token")
    const [data,setData]=useState({})
    const [open,setOpen]=useState(false)
    const [passwordshow,setPasswordshow]=useState(false)
    const [pass,setPass]=useState({password:"",token:"8b963e5191bc4ca4074a017e7d2af72866aaaa36e0"})

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    console.log("data",data)

    const handleChanges = (e) => {
        setPass({...pass,[e.target.name]:e.target.value})
    }

    const handleClick = () => {
        axios.post(BaseUrl("api/password_reset/"),data)
            .then((response)=>console.log(response.data))
            .catch((error)=>console.log(error))

        
        setOpen(true)
    }

    const handleReset = () => {
        axios.post(BaseUrl("/api/password_reset/confirm/"),pass)
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error))
    } 
    return(
        <>
        <center>
        <Card sx={{marginTop:"300px",maxWidth:"400px"}}>
        <Typography sx={{textDecoration:"underline"}}>Forgot password</Typography><br/><br/>
        <TextField type="text" variant="outlined" label="Email address" InputLabelProps={{shrink:true}} name="email" value={data.email} onChange={handleChange} sx={{width:250}} /><br/><br/>
        <Button variant="contained" onClick={handleClick}>submit</Button><br/><br/>
        <Link to = {-1}>Back</Link><br/><br/>
        </Card>
        <ModalComponent
        open={open}
        modalValue={
            <>
            <Typography sx={{marginLeft:"200px",cursor:"pointer"}}onClick={()=>setOpen(false)}>X</Typography>
            <TextField type={passwordshow?"text":"password"} variant="outlined" label="password" InputLabelProps={{shrink:true}} name="password" value={pass.password} onChange={handleChanges} sx={{width:250}}
        InputProps={{
            endAdornment:(<InputAdornment position="end">
            <IconButton onClick={()=>setPasswordshow(!passwordshow)}>
            {passwordshow ? <VisibilityIcon/>:<VisibilityOffIcon/>}
            </IconButton>
            </InputAdornment>
        )
    }}/><br/><br/>
    <TextField type="text" variant="outlined" label="token" InputLabelProps={{shrink:true}} name="token" onChange={handleChanges} value={pass.token}/><br/>
    <Button variant="contained" onClick={handleReset}>Reset</Button>
    </>
        }/>
     
        </center>
        </>
    )
}
export default Forgotpassword