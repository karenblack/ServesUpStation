import axios from '../config/axios'
import React, { useState } from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap';


const EditCart = (props) => {
  const location = useLocation();
  const {cartID} = useParams();           // get the menuID sent in the URL params
  const editItem = location.state;

  const history = useHistory();

  // get data passed in from props and setState to update from form input    
  const [totalCost, setTotalCost] = useState(editItem ? editItem.totalCost : '')
  const [status, setStatus] = useState(editItem ? editItem.status : '')

  const cart = {totalCost, status, cartID}

  const handleStatusToggle = () => {
    setStatus(!status)
  };

  const updateCart = cart => {
    axios.put('/carts', cart)
      .then(p => {
        history.push('/carts');
      })
        .catch(err => console.log('update error', err));
  };

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Update a Cart</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), updateCart(cart)))}>
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
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}

export default EditCart