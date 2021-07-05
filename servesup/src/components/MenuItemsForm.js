import React, { useState } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';

const MenuItemForm = ({ addMenuItem }) => {
  const [menuName, setMenuName] = useState('')
  const [catID, setcatID] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [description, setDescription] = useState('')
  const [producer, setProducer] = useState('')
  const [year, setYear] = useState('')

  const menuItem = {menuName, catID, unitPrice, description, producer, year}

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Add a Menu Item</h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), addMenuItem(menuItem)))}>
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
        <Button type="submit">Add Menu Item</Button>
      </Form>
    </div>
  );
}

export default MenuItemForm