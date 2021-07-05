import axios from '../config/axios'
import React, { useState } from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap';


const EditMenuItem = (props) => {
  const location = useLocation();
  const {menuID} = useParams();           // get the menuID sent in the URL params
  const editItem = location.state;

  const history = useHistory();

  // get data passed in from props and setState to update from form input    
  const [menuName, setMenuName] = useState(editItem ? editItem.menuName : '')
  const [catID, setcatID] = useState(editItem ? editItem.catID : '')
  const [unitPrice, setUnitPrice] = useState(editItem ? editItem.unitPrice : '')
  const [description, setDescription] = useState(editItem ? editItem.description : '')
  const [producer, setProducer] = useState(editItem ? editItem.producer : '')
  const [year, setYear] = useState(editItem ? editItem.year : '')

  const menuItem = {menuName, catID, unitPrice, description, producer, year, menuID}

  const updateMenuItem = menuItem => {
    console.log('updating menuItem', menuItem)
    axios.put('/menuItems', menuItem)
      .then(p => {
        history.push('/menuItems');
      })
        .catch(err => console.log('update error', err));
  }

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Update a Menu Item</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), updateMenuItem(menuItem)))}>
        <Row>
        <Col xs = "auto">
            <Form.Label>
            Name:
            <Form.Control type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Category ID:
            <Form.Control type="number" value={catID} onChange={(e) => setcatID(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Unit Price:
            <Form.Control type="number" step = "0.01" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Description:
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Producer:
            <Form.Control type="text" value={producer} onChange={(e) => setProducer(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Year: 
            <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)}/>
            </Form.Label>
        </Col>
        </Row>
        <Button type="submit">Update Menu Item</Button>
      </Form>
    </div>
  );
}

export default EditMenuItem