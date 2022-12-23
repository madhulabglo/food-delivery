import { AppBar, Drawer, IconButton, Toolbar, Typography,Box,CssBaseline ,Divider, List, ListItem, ListItemButton, ListItemText, Badge, Menu, MenuItem, Card, TextField,InputAdornment, Button} from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";

import logo from "../image/delivery.svg"
import profile from "../image/profile.svg"
import menu from "../image/menu.svg"
import { useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Active from "../image/active.svg"

import BaseUrl from "./mode";
import { useEffect } from "react";
import ModalComponent from "./modal";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import foodlogo from "../image/foodie.svg"

const style = {
  cursor:"pointer"
}


const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [store,setStore]=useState([])
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const cusname = localStorage.getItem("cusname")

    const [active,setActive]=useState("")
    const path=location.pathname
    console.log(path)

    console.log("cusname",cusname)

    const [menuIcon,setMenuIcon]=useState(false)
    const [open,setOpen]=useState(true)
    const [anchor,setAnchor]=useState(null)
    const [menu,setMenu]=useState(false)
    const [settings,setSettings]=useState(false)
    const [pass,setPass]=useState(false)
    const [passwordshow,setPasswordshow]=useState(false)
    const [password,setPassword]=useState(false)
    const [data,setData]=useState({})
    const [cart,setCart]=useState([])
    const drawerWidth="300px";

    const apidata = () => {
      axios.get(BaseUrl("profile/"),{
        headers:{
            "Accept":"application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
    })
    .then((response)=>setStore(response.data))
    .catch((error)=>console.log(error))
    }

    const cartlist = () => {
    axios.get(BaseUrl("/cart/"),{
      headers:{
        "Accept":"application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    }
    })
    .then((response)=>setCart(response.data))
    .catch((error)=>console.log(error))
  }

    const handleProfile = () => {
      setAnchor(true)
      console.log("menu")
    }

    const handleProfileMenu = () => {
      setMenu((prevMenu)=>!prevMenu)
    }

    const handleSettings = () => {
      setSettings((prevSettings)=>!prevSettings)
    }

    const handleChangePassword = () => {
      setPass(true)
    }

    const handleChange = (e) => {
      setData({...data,[e.target.name]:e.target.value})
    }

    const handleUpdatePassword = () => {
      axios.put(BaseUrl("/api/change-password/"),data,{
        headers:{
          "Accept":"application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
      }
      })
    }

    const sidenav = () => {
      switch(path){
        case "/home":
          setActive("home")
          break;
        case "/manageractiveorders":
          setActive("activeorders")
          break;
        case "/managerdelivery":
          setActive("deliveryorders")
          break;
        case "/foodlist":
          setActive("foodlist")
          break;
        case "/restaurantlist":
          setActive("restaurantlist")
          break;
        case "/customeractiveorders":
          setActive("customeractiveorders")
          break;
        case "/customerdelivered":
          setActive("customerdeliveryorders")
          break;
        case "/cart":
          setActive("foodlist")
          break;

      }
    }
    useEffect(()=> {
      apidata()
      sidenav()
      cartlist()
    },[path])

 

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleFoodList = () => {
      navigate(`/foodlist`)
    }

    const handleRestaurantList = () => {
      navigate(`/restaurantlist`)
    }

    const handleCustomerActiveOrders = () => {
      navigate(`/customeractiveorders`)
    }

    const handleManagerActiveOrders = () => {
        navigate(`/manageractiveorders`)
    }

    const handleHome = () => {
      navigate(`/home`)
    }

    const handleLogout = () => {
      localStorage.clear("token")
      navigate(`/login`)
    }

    const handleManagerDeliveryOrders = () => {
      navigate(`/managerdelivery`)
    }

    const handleCustomerCancelledOrders = () => {
      navigate(`/customercancelled`)
    }

    const handleCustomerDeliveredOrders = () => {
      navigate(`/customerdelivered`)
    }

    const handleShopingIcon = () => {
      navigate("/cart")
    }
    
   

    // console.log("v",store.filter((el)=>el.username === cusname).map((elem)=>elem.profile.is_manager))
    return(
    <>
    {location.pathname === "/" || location.pathname === "/login" ||
    location.pathname === "/customerregistration" || location.pathname === "/forgotpassword" ? <></>:
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

        {open?
         <Button sx={{marginLeft:"300px"}}><img src={foodlogo} /></Button>:<Button ><img src={foodlogo}/></Button>}
          {open ?
          <>
          {store?.filter((el)=>el.username === name)?.map((ele)=>{
            return(
              <>
              {ele.profile.is_manager==true  ? 
              <>
              <IconButton
              color="inherit"
              edge="end"
              sx={{marginLeft:"1000px",fontSize:"large"}}
              onClick={handleProfile}
              >
              <AccountCircleIcon/>{name}
              </IconButton>
              </>
              :
              <>
              <Badge badgeContent={cart.length} color="secondary">
              <IconButton
               color="inherit"
               edge="end"
               sx={{marginLeft:"1000px",fontSize:"large"}}
               onClick={handleShopingIcon}>
                <ShoppingCartIcon/>
              </IconButton>
              </Badge>
              <IconButton
               color="inherit"
               edge="end"
               sx={{marginLeft:"20px",fontSize:"large"}}
               onClick={handleProfile}
               >
               <AccountCircleIcon/>{name}
               </IconButton>
               </>
               }
               
              </>
            )})}
         
         
           <IconButton 
           color="inherit"
           onClick={handleLogout}
           sx={{marginLeft:"10px",fontSize:"large"}}
      
           >
            <LogoutIcon/>Logout
            </IconButton>
               </>
              :
              <>
              {store?.filter((el)=>el.username === name)?.map((ele)=>{
            return(
              <>
              {ele.profile.is_manager==true  ? 
              <>
              <IconButton
              color="inherit"
              edge="end"
              sx={{marginLeft:"1300px",fontSize:"large"}}
              onClick={handleProfile}
              >
              <AccountCircleIcon/>{name}
              </IconButton>
              </>
              :
              <>
              <Badge badgeContent={cart.length} color="secondary">
              <IconButton
               color="inherit"
               edge="end"
               sx={{marginLeft:"1250px",fontSize:"large"}}
               onClick={handleShopingIcon}>
                <ShoppingCartIcon/>
              </IconButton>
              </Badge>
              <IconButton
               color="inherit"
               edge="end"
               sx={{marginLeft:"50px",fontSize:"large"}}
               onClick={handleProfile}
               >
               <AccountCircleIcon/>{name}
               </IconButton>
               </>
               }
               
              </>
            )})}
         
         
           <IconButton 
           color="inherit"
           onClick={handleLogout}
           sx={{marginLeft:"30px",fontSize:"large"}}
      
           >
            <LogoutIcon/>Logout
            </IconButton>
              </>}
            <Menu
          anchorEl={anchor}
          open={anchor}
          onClose={()=>setAnchor(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{marginLeft:"1300px",marginTop:"40px"}}
      >
        <MenuItem onClick={handleProfileMenu}>profile</MenuItem>
        <MenuItem onClick={handleSettings}>settings</MenuItem>
      </Menu>  
        </Toolbar>
      </AppBar>
      {menu ?
      store?.filter((el)=>el.username === name).map((ele)=>{
        return(
          <center>
          <Card sx={{marginTop:"80px",marginLeft:"1110px",height:"150px",width:"200px"}}>
            <List>
              <ListItem>
                  <ListItemText>Name:{ele.username}</ListItemText>
              </ListItem>
            </List>
            <Divider/>
            <List>
              <ListItem>
                  <ListItemText>Email:{ele.email}</ListItemText>
              </ListItem>
            </List>
            <Divider/>
          </Card>
          </center>
        )
      }):""}
     
     {settings?
     <Card sx={{marginTop:"80px",marginLeft:"1200px",height:"100px",width:"200px"}}>
      <List>
              <ListItem>
                  <ListItemButton variant="contained" sx={{bgcolor:"pink"}} onClick={handleChangePassword}>Change Password</ListItemButton>
              </ListItem>
            </List>
            <Divider/>
     </Card>:<></>}
     <ModalComponent
     open={pass}
    //  onClose={()=>setPass(false)}
     modalValue={
       <>
       <Typography sx={{textDecoration:"underline"}}>change password</Typography>
       <Typography sx={{marginLeft:"230px",marginTop:"-20px",cursor:"pointer"}} onClick={()=>setPass(false)}>X</Typography><br/><br/>
       <TextField type={passwordshow?"text":"password"} variant="outlined" label="old password" InputLabelProps={{shrink:true}} name="old_password" value={data.old_password} onChange={handleChange} sx={{width:250}}
        InputProps={{
                    endAdornment:(<InputAdornment position="end">
                    <IconButton onClick={()=>setPasswordshow(!passwordshow)}>
                    {passwordshow ? <VisibilityIcon/>:<VisibilityOffIcon/>}
                    </IconButton>
                    </InputAdornment>
                )
            }} /><br/><br/>
      <TextField type={password?"text":"password"} variant="outlined" label="new password" InputLabelProps={{shrink:true}} name="new_password" value={data.new_password} onChange={handleChange} sx={{width:250}}
        InputProps={{
                    endAdornment:(<InputAdornment position="end">
                    <IconButton onClick={()=>setPassword(!password)}>
                    {password ? <VisibilityIcon/>:<VisibilityOffIcon/>}
                    </IconButton>
                    </InputAdornment>
                )
            }} /><br/><br/>
        <Button variant="contained" onClick={handleUpdatePassword}>update</Button>
       </>
     }/><br/><br/>
    
      
     
      
      {location.pathname === "/home"|| location.pathname === "/manageractiveorders" || location.pathname === "/managerdelivery" ?
      <>
      <Drawer
        sx={{
          ...style,
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Typography sx={{marginTop:"30px",marginLeft:"250px"}} onClick={()=>setOpen(false)}><IconButton>X</IconButton></Typography>
        <Divider />
        <List>
          <ListItem  sx={{bgcolor:active === "home"?"yellow":""}}>
            <ListItemButton onClick={handleHome}><HomeIcon/>
            <ListItemText>Home</ListItemText>
            </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem sx={{bgcolor:active === "activeorders"?"yellow":""}}>
          <ListItemButton onClick={handleManagerActiveOrders}><img src={Active} width="20px"/>
            <ListItemText>Active Orders</ListItemText></ListItemButton>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem sx={{bgcolor:active === "deliveryorders"?"yellow":""}}>
          <ListItemButton onClick={handleManagerDeliveryOrders}><DeliveryDiningIcon/>
            <ListItemText>Delivery Orders</ListItemText></ListItemButton>
          </ListItem>
        </List>
        <Divider/>
        </Drawer>
        </>
        :
        <></>
      }
      {location.pathname === "/foodlist" || (location.pathname) === "/cart" || (location.pathname) === "/restaurantlist" ||
      location.pathname=== "/customeractiveorders" || location.pathname === "/customerdelivered" ?
        <>
        <Drawer
        sx={{
          ...style,
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Typography sx={{marginTop:"30px",marginLeft:"250px"}} onClick={()=>setOpen(false)}><IconButton>X</IconButton></Typography>
        <Divider />
        <List>
          <ListItem sx={{bgcolor:active === "foodlist"?"yellow":""}}>
            <ListItemButton  onClick={handleFoodList}><FoodBankIcon/>
            <ListItemText>Food List</ListItemText>
            </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem sx={{bgcolor:active === "restaurantlist"?"yellow":""}}>
            <ListItemButton   onClick={handleRestaurantList}><RestaurantIcon/>
            <ListItemText>Restaurant List</ListItemText>
            </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem sx={{bgcolor:active === "customeractiveorders"?"yellow":""}}>
            <ListItemButton   onClick={handleCustomerActiveOrders}><img src={Active} width="20px"/>
            <ListItemText>Active orders</ListItemText>
            </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem sx={{bgcolor:active === "customerdeliveryorders"?"yellow":""}}>
            <ListItemButton   onClick={handleCustomerDeliveredOrders}><DeliveryDiningIcon/>
            <ListItemText>Delivered orders</ListItemText>
            </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        </Drawer>
        </>
        :
        <></>
       }
    
        </Box>
}
       
        </>
    )
}
export default Navbar