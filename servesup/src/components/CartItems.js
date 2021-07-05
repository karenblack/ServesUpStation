import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../config/axios'
import { Table, Container, Button} from 'react-bootstrap'
import CartItemForm from './CartItemsForm'

const CartItems = () => {
    const [cartitems, setCartItems] = useState([]);
    const history = useHistory();
  
    const getCartItems = () => {
      axios.get("/cartItems").then((res) => {
      setCartItems(res.data);
      });
    };

    useEffect(() => {
      getCartItems();
    }, [cartitems]);

    const addCartItem = (cartItem) => {
        console.log('adding cartItem', cartItem)
        axios.post('/cartItems', cartItem)
            .then(p => setCartItems(cartitems.concat(p.data)))
    };

    const deleteCartItem = (detailsID) => {
        axios.delete('/cartItems/' + detailsID)
            .then(() => setCartItems(cartitems.filter(p => p.detailsID !== detailsID)))
    };

    const updateMenuItem = (detailsID) =>{
      const editItem = cartitems.find((cartitems) => cartitems.detailsID === detailsID);
      history.push({pathname: "/cartItems/edit/" + detailsID, state: editItem});
    };

    const renderedCartItems = (
        <Container style={{ marginTop: '25px' }}>
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Details ID</th>
                <th>Cart ID</th>
                <th>Menu ID</th>
                <th>Quantity</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartitems.map((item) => {
                return(
                  <tr key = {item.detailsID}>
                    <td>{item.detailsID}</td>
                    <td>{item.cartID}</td>
                    <td>{item.menuID}</td>
                    <td>{item.quantity}</td>
                    <td><Button variant = "warning" onClick={() => updateMenuItem(item.detailsID)}>Update</Button></td> 
                    <td><Button variant = "danger" onClick={() => deleteCartItem(item.detailsID)}>Delete</Button></td>   
                  </tr>
                );
              })}
             </tbody>
          </Table>
        </div>
        </Container>
      );
  
      // render the addMenuItemForm and the menuItem database table
      return (
        <div className = 'm-3'>
          <CartItemForm addCartItem={addCartItem} />
          <br></br>
          <br></br>
          <h1>Cart Items</h1>
          {renderedCartItems}
        </div>
      );

}

export default CartItems