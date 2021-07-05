import React, { useState } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';

const PaymentForm = ({ addPayment }) => {
  const [cartID, setcartID] = useState('')
  const [date, setDate] = useState('')
  const [tipAmount, setTipAmount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [paymentType, setPaymentType] = useState('')

  const payment = {cartID, date, tipAmount, totalAmount, paymentType}

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Add a Payment</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), addPayment(payment)))}>
        <Row>
        <Col xs = "auto">
            <Form.Label>
            Cart ID:
            <Form.Control type="number" value={cartID} onChange={(e) => setcartID(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Date:
            <Form.Control type="datetime-local" placeholder="YYYY-MM-DD HH:MM:SS" max="2100-06-24T00:00" value={date} onChange={(e) => setDate(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Tip Amount:
            <Form.Control type="number" step = "0.01" value={tipAmount} onChange={(e) => setTipAmount(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Total Amount:
            <Form.Control type="numbr" step = "0.01" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Payment Type: 
            <Form.Control type="text" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}/>
            </Form.Label>
        </Col>
        </Row>
        <Button type="submit">Add Menu Item</Button>
      </Form>
    </div>
  );
}

export default PaymentForm