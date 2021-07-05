import React, { useState } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap';

const ProductForm = ({ addCategory}) => {
    const [beverageType, setBeverageType] = useState('')
    const [productSpec, setProductSpec] = useState('')

const productCategory = {beverageType, productSpec}

return (
    <div className = 'm-3'>
      <br></br>
      <h1>Add a Product Category </h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), addCategory(productCategory)))}>
        <Row>
        <Col xs = "auto">
            <Form.Label>
            Beverage Type:
            <Form.Control type="text" value={beverageType} onChange={(e) => setBeverageType(e.target.value)}/>
            </Form.Label>
        </Col>

        <Col xs="auto">
            <Form.Label>
            Product Spec:
            <Form.Control type="text" value={productSpec} onChange={(e) => setProductSpec(e.target.value)}/>
            </Form.Label>
        </Col>
        </Row>
        <Button type="submit">Add Product Category</Button>
      </Form>
    </div>
  );
}

export default ProductForm