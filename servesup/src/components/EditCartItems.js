import axios from '../config/axios'
import React, { useState } from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap';


const EditCartItem = (props) => {
  const location = useLocation();
  const {detailsID} = useParams();           // get the menuID sent in the URL params
  const editItem = location.state;

  const history = useHistory();

  // get data passed in from props and setState to update from form input    
  const [cartID, setCartID] = useState(editItem ? editItem.cartID : '')
  const [menuID, setMenuID] = useState(editItem ? editItem.menuID : '')
  const [quantity, setQuantity] = useState(editItem ? editItem.quantity : '')

  const cartItem = {cartID, menuID, quantity, detailsID}

  const updateCartItem = cartItem => {
    console.log('updating cartItem', cartItem)
    axios.put('/cartItems', cartItem)
      .then(p => {
        history.push('/cartItems');
      })
        .catch(err => console.log('update error', err));
  }

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Update a Cart Item</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), updateCartItem(cartItem)))}>
        <Row>
        <Col xs = "auto">
            <Form.Label>
            Cart ID:
            <Form.Control type="number" value={cartID} onChange={(e) => setCartID(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Menu ID:
            <Form.Control type="number" value={menuID} onChange={(e) => setMenuID(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Quantity:
            <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </Form.Label>
        </Col>
        </Row>
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}

export default EditCartItem