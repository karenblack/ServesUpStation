import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import { Table, Container, Button} from 'react-bootstrap'
import { useHistory} from 'react-router-dom'
import ProductForm from './ProductCategoriesForm'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    // Get Product Categories data
    const getCategories = () => {
        axios.get("/productCategories").then((res) => {
        setCategories(res.data);
        });
      };
  
      useEffect(() => {
        getCategories();
      }, [categories]);

    
    const addCategory = (productCategory) => {
    axios.post('/productCategories', productCategory)
        .then(p => setCategories(categories.concat(p.data)))
    };

    const deleteCategory= (categoryID) => {
    axios.delete('/productCategories/' + categoryID)
        .then(() => setCategories(categories.filter(p => p.categoryID !== categoryID)))
    };

    const updateCategory = (categoryID) =>{
      const editProduct = categories.find((categories) => categories.categoryID === categoryID);
      history.push({pathname: "/productCategories/edit/" + categoryID, state: editProduct});
    };


    const renderedCategories = (
        <Container style={{ marginTop: '25px' }}>
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Beverage Type</th>
                <th>Product Spec</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => {
                return(
                  <tr key = {item.categoryID}>
                    <td>{item.categoryID}</td>
                    <td>{item.beverageType}</td>
                    <td>{item.productSpec}</td>
                    <td><Button variant = "warning" onClick={() => updateCategory(item.categoryID)}>Update</Button></td> 
                    <td><Button variant = "danger" onClick={() => deleteCategory(item.categoryID)}>Delete</Button></td>   
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
          <ProductForm addCategory={addCategory} />
          <br></br>
          <br></br>
          <h1>Product Categories</h1>
          {renderedCategories}
        </div>
      );
}
export default Categories