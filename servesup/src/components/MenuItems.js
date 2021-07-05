import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../config/axios'
import { Table, Container, Button} from 'react-bootstrap'
import MenuItemForm from './MenuItemsForm'

const MenuItems = () => {
    const [menuitems, setMenuItems] = useState([]);
    const history = useHistory();
  
    const getMenuItems = () => {
      axios.get("/menuItems").then((res) => {
      setMenuItems(res.data);
      });
    };

    useEffect(() => {
      getMenuItems();
    }, [menuitems]);

    const addMenuItem = (menuItem) => {
      console.log('adding menuItem', menuItem)
      axios.post('/menuItems', menuItem)
        .then(p => setMenuItems(menuitems.concat(p.data)))
    };
  
    const deleteMenuItem = (menuID) => {
      axios.delete('/menuItems/' + menuID)
        .then(() => setMenuItems(menuitems.filter(p => p.menuID !== menuID)))
    };

    const updateMenuItem = (menuID) =>{
      const editItem = menuitems.find((menuitems) => menuitems.menuID === menuID);
      history.push({pathname: "/menuItems/edit/" + menuID, state: editItem});
    };

    const renderedMenuItems = (
      <Container style={{ marginTop: '25px' }}>
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Menu ID</th>
              <th>Menu Name</th>
              <th>Category ID</th>
              <th>Unit Price (USD)</th>
              <th>Description</th>
              <th>Producer</th>
              <th>Year</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {menuitems.map((item) => {
              return(
                <tr key = {item.menuID}>
                  <td>{item.menuID}</td>
                  <td>{item.menuName}</td>
                  <td>{item.catID}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.description}</td>
                  <td>{item.producer}</td>
                  <td>{item.year}</td>
                  <td><Button variant = "warning" onClick={() => updateMenuItem(item.menuID)}>Update</Button></td> 
                  <td><Button variant = "danger" onClick={() => deleteMenuItem(item.menuID)}>Delete</Button></td>   
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
        <MenuItemForm addMenuItem={addMenuItem} />
        <br></br>
        <br></br>
        <h1>Menu Items</h1>
        {renderedMenuItems}
      </div>
    );
}

export default MenuItems