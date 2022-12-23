import "../src/App.css"

import Initial from './food/initialpage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './food/navbar';
import FoodList from './food/foodlist';
import Cart from './food/cart';
import RestaurantList from './food/restaurantlist';
import CustomerActiveOrders from './food/customeractive';
import Home from './food/home';
import CustomerRegistration from './food/customerres';
import ManagerActiveOrders from './food/manageractiveorders';
import ManagerDelivery from './food/managerdelivery';
import CustomerDelivery from './food/customerdelivery';
import Login from './food/login';
import Forgotpassword from './food/forgotpassword';


function App() {
  return (
    <div>
     <Router>
       <Navbar/>
       <Routes>
         <Route exact path="/" element={<Initial/>}/>
         <Route exact path="/login" element={<Login/>}/>
         <Route exact path="/forgotpassword" element={<Forgotpassword/>}/>
         <Route exact path="/home" element={<Home/>}/>
         <Route exact path="/customerregistration" element={<CustomerRegistration/>}/>
         <Route exact path="/manageractiveorders" element={<ManagerActiveOrders/>}/>
         <Route exact path="/restaurantlist" element={<RestaurantList/>}/>
         <Route exact path="/foodlist" element={<FoodList/>}/>
         <Route exact path="/cart" element={<Cart/>}/>
         <Route exact path="/customeractiveorders" element={<CustomerActiveOrders/>}/>
         <Route exact path="/managerdelivery" element={<ManagerDelivery/>}/>
         <Route exact path="/customerdelivered" element={<CustomerDelivery/>}/>
       </Routes>
     </Router>
    </div>
  );
}

export default App;
