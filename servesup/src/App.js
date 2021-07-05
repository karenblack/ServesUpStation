// import logo from './logo.svg';
import './App.css';
// import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';


import MenuItems from './components/MenuItems'
import EditMenuItem from './components/EditMenuItems'
import Categories from './components/ProductCategories'
import EditProduct from './components/EditProducts'
import Carts from './components/Carts'
import EditCart from './components/EditCarts';
import CartItems from './components/CartItems'
import EditCartItem from './components/EditCartItems';
import Payments from './components/Payments'

function App() {
  return (
  <div >
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" style = {{'margin': '10px'}}>Serves-Up Station</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href='/menuItems'>Menu Items</Nav.Link>
              <Nav.Link href='/productCategories'>Product Categories</Nav.Link>
              <Nav.Link href='/carts'>Carts</Nav.Link> 
              <Nav.Link href='/cartItems'>Cart Items</Nav.Link>
              <Nav.Link href='/payments'>Payments</Nav.Link>
            </Nav>
         </Navbar.Collapse>
       </Navbar>
       <Switch>
         <Route exact path="/menuItems" component={MenuItems} />
         <Route exact path="/menuItems/edit/:menuID" component={EditMenuItem} />
         <Route exact path="/productCategories" component={Categories} />
         <Route exact path="/productCategories/edit/:categoryID" component={EditProduct} />
         <Route exact path="/carts" component={Carts} />
         <Route exact path="/carts/edit/:cartID" component={EditCart} />
         <Route exact path="/cartItems" component={CartItems} />
         <Route exact path="/cartItems/edit/:detailsID" component={EditCartItem} />
         <Route path="/payments" component={Payments} />
         {/* <Route component={NotFound} />  */}
       </Switch>
    </Router>
  </div>
  );
}

export default App;
