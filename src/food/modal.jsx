import React from "react"
import { Modal,Box, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
    maxHeight: "90%",
  
  };

const ModalComponent = ({ open, values, modalValue }) => {

    return(
        <>
        <Modal open={open} onClose={values} >
        <Box sx={style} onMouseLeave={values}>
          <center>
          {modalValue}
          </center>
        </Box>
      </Modal>
        </>
    )
}
export default ModalComponent