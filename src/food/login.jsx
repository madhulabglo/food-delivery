import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { Button, Card, TextField, Typography, IconButton, InputAdornment } from "@mui/material"
import { useNavigate,Link } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import BaseUrl from "./mode"
import ModalComponent from "./modal"
import CustomerRegistration from "./customerres"
import { useRef } from "react"

const Login  = () => {

    const fieldRef = useRef({})
    const[data,setData]=useState({username:"",password:""})
    const[response,setResponse]=useState({token:"",manager:"",user:""})
    const[passwordshow,setPasswordshow]=useState(false)
    const[flag,setFlag]=useState({username:false,password:false})
    const [token,setToken]=useState("")
    const [open,setOpen]=useState(false)
    const [message,setMessage]=useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.currentTarget.value.length>0){
            setFlag({username:false})
        }
        else if(e.currentTarget.value.length>0){
            setFlag({password:false})
        }
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleClick = () => {
        if(data.username === ""){
            fieldRef.current.username.focus()
            setFlag({username:true})
        }
        else if(data.password === ""){
            fieldRef.current.password.focus()
            setFlag({password:true})
        }
        // else{
        //     setMessage(true)
        // }
        axios.post(BaseUrl("login/"),data)
        .then((response)=>setResponse(response.data))
        .catch((error)=>console.log(error))
    }
    console.log("res",response)

    const handleRegister = () => {
       setOpen(true)

    }
    useEffect(()=>{
      
        if(response.token !== "" && response.token !== undefined && response.manager === "true"){
            localStorage.setItem("token",response.token)
            localStorage.setItem("name",response.user)
            navigate('/home')
        }
        else if(response.token !== "" && response.token !== undefined && response.manager === "false"){
            localStorage.setItem("token",response.token)
            localStorage.setItem("name",response.user)
            navigate('/foodlist')
           
        }  
    },[response.token])

    return(
        <>
        <center>
        <Typography sx={{marginTop:"30px",marginLeft:"800px"}}><Button variant="contained" onClick={handleRegister}>sign up</Button></Typography>
       {open?
       <>
       <ModalComponent open={open}
       modalValue={<CustomerRegistration state={open} setstate={setOpen}/>}/>
       </>
       :
       <>
        <Card sx={{maxWidth:500,marginTop:20}}>
        <Typography sx={{textDecoration:"underline"}}>Login Page</Typography><br/><br/>
        <TextField type="text" variant="outlined" label="username" InputLabelProps={{shrink:true}} name="username" value={data.username} onChange={handleChange} sx={{width:250}} inputRef={ref=>fieldRef.current.username=ref}/><br/><br/>
        {flag.username && <Typography sx={{color:"red"}}>This field is required</Typography>}
        <TextField type={passwordshow?"text":"password"} variant="outlined" label="password" InputLabelProps={{shrink:true}} name="password" value={data.password} onChange={handleChange} sx={{width:250}}
        InputProps={{
            endAdornment:(<InputAdornment position="end">
            <IconButton onClick={()=>setPasswordshow(!passwordshow)}>
            {passwordshow ? <VisibilityIcon/>:<VisibilityOffIcon/>}
            </IconButton>
            </InputAdornment>
        )
    }} inputRef={ref=>fieldRef.current.password=ref}/><br/><br/>
      {flag.password && <Typography sx={{color:"red"}}>This field is required</Typography>}
      {/* {message && <Typography sx={{color:"red"}}>Mismatch username and password</Typography>} */}
        <Button onClick={handleClick} variant="contained">Login</Button><br/><br/>
        <Typography sx={{marginRight:"300px"}}><Link to="/forgotpassword">Forgot Password?</Link></Typography>
        </Card>
        </>
        }
        </center>
        </>
    )
}
export default Login