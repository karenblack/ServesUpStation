import React, { useState } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';

const CartForm = ({ addCart }) => {
  const [totalCost, setTotalCost] = useState('')
  const [status, setStatus] = useState(false)


  const cart = {totalCost, status}

  const handleStatusToggle = () => {
    setStatus(!status)
  }

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Add a Cart</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), addCart(cart)))}>
        <Row>
        <Col xs = "auto">
            <Form.Label>
            Total Cost (USD):
            <Form.Control type="number" step = "0.01" value={totalCost} onChange={(e) => setTotalCost(e.target.value)}/>
            </Form.Label>
        </Col>


        <Col xs="auto">
        <Form.Label>
            Active Cart?:
            <Form.Check type="checkbox" value={status} onChange={() => handleStatusToggle()}/>
            </Form.Label>
        </Col>
        </Row>
        <Button type="submit">Add Cart</Button>
      </Form>
    </div>
  );
}

export default CartForm