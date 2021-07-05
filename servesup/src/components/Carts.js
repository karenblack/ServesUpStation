import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../config/axios'
import { Table, Container, Button} from 'react-bootstrap'
import CartForm from './CartsForm'

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const history = useHistory();
  
    const getCarts = () => {
      axios.get("/carts").then((res) => {
      setCarts(res.data);
      });
    };

    useEffect(() => {
      getCarts();
    }, [carts]);

    const addCart = (cart) => {
        axios.post('/carts', cart)
          .then(p => setCarts(carts.concat(p.data)))
      };
    
    const deleteCart = (cartID) => {
      axios.delete('/carts/' + cartID)
        .then(() => setCarts(carts.filter(p => p.cartID !== cartID)))
    };

    const updateCart = (cartID) =>{
      const editCart = carts.find((carts) => carts.cartID === cartID);
      history.push({pathname: "/carts/edit/" + cartID, state: editCart});
    };

    const renderedCarts = (
        <Container style={{ marginTop: '25px' }}>
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Cart ID</th>
                <th>Total Cost (USD)</th>
                <th>Active Cart</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item) => {
                return(
                  <tr key = {item.cartID}>
                    <td>{item.cartID}</td>
                    <td>{item.totalCost}</td> 
                    <td>{item.status}</td>
                    <td><Button variant = "warning" onClick={() => updateCart(item.cartID)}>Update</Button></td> 
                    <td><Button variant = "danger" onClick={() => deleteCart(item.cartID)}>Delete</Button></td>   
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
          <CartForm addCart={addCart} />
          <br></br>
          <br></br>
          <h1>Carts</h1>
          {renderedCarts}
        </div>
      );
  }
  
  export default Carts