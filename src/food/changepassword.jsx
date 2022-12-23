import React from "react"
import { useState } from "react"

const changepassword = () => {

    const [pass,setpass]=useState({})
    return(
        <>
         <TextField type="text" variant="outlined" label="old password" InputLabelProps={{shrink:true}} name="old_password" value={pass.old_password} onChange={handleChange} sx={{width:250}}/><br/><br/>
         <TextField type="text" variant="outlined" label="new password" InputLabelProps={{shrink:true}} name="new_" value={data.username} onChange={handleChange} sx={{width:250}} /><br/><br/>
        </>
    )
}
export default changepassword