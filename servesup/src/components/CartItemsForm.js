import React, { useState } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';

const CartItemForm = ({ addCartItem }) => {
  const [cartID, setCartID] = useState('')
  const [menuID, setMenuID] = useState('')
  const [quantity, setQuantity] = useState('')

  const cartItem = {cartID, menuID, quantity}

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Add a Cart Item</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), addCartItem(cartItem)))}>
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
        <Button type="submit">Add Item</Button>
      </Form>
    </div>
  );
}

export default CartItemForm