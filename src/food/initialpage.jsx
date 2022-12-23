import  React from "react"
import { Button, Card, IconButton, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import click from "../image/click.svg"


const Initial = () => {
    const navigate = useNavigate()

    const handlelogin = () => {
        navigate(`/login`)
    }

    return(
        <>
        <center>
            <Card sx={{marginTop:"200px",width:"300px"}}>
                <h2>Are you Ready to login!</h2>
                <IconButton onClick={handlelogin} className="click">
                <img src={click} alt="click here" sx={{width:"200px"}}/>
                </IconButton>
            </Card>
            
        </center>
        </>
    )
}
export default Initial