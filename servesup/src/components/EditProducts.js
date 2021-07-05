import axios from '../config/axios'
import React, { useState } from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap';


const EditProduct = (props) => {
  const location = useLocation();
  const {categoryID} = useParams();           // get the categoryID sent in the URL params
  const editProduct = location.state;

  const history = useHistory();

  // get data passed in from props and setState to update from form input    
  const [beverageType, setBeverageType] = useState(editProduct? editProduct.beverageType : '')
  const [productSpec, setProductSpec] = useState(editProduct ? editProduct.productSpec : '')

  const productCategory = {beverageType, productSpec, categoryID}

  const updateCategory = productCategory => {
    axios.put('/productCategories', productCategory)
      .then(p => {
        history.push('/productCategories');
      })
        .catch(err => console.log('update error', err));
  }

  return (
    <div className = 'm-3'>
      <br></br>
      <h1>Update a Product Category </h1>
      <Form  onSubmit={(e) => ((e.preventDefault(), updateCategory(productCategory)))}>
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
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}

export default EditProduct