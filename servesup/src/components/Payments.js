import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import { Table, Container} from 'react-bootstrap'
import PaymentForm from './PaymentsForm'

const Payments = () => {
    const [payments, setPayments] = useState([]);
  
    const getPayments = () => {
      axios.get("/payments").then((res) => {
      setPayments(res.data);
      });
    };

    useEffect(() => {
      getPayments();
    }, [payments]);

    const addPayment = (payment) => {
      console.log('adding payment', payment)
      axios.post('/payments', payment)
        .then(p => setPayments(payments.concat(p.data)))
    };

    // const updateMenuItem = (menuID) => {
    //   console.log('updating menuItem', menuItem)
    //   axios.put('/menuItems/', menuItem)
    //     .then(p => setMenuItems(menuItem.concat(p.data)))
    // };

    const renderedPayments = (
      <Container style={{ marginTop: '25px' }}>
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Cart ID</th>
              <th>Date</th>
              <th>Tip Amount (USD)</th>
              <th>Total Amount</th>
              <th>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item) => {
              return(
                <tr key = {item.paymentID}>
                  <td>{item.paymentID}</td>
                  <td>{item.cartID}</td>
                  <td>{item.date}</td>
                  <td>{item.tipAmount}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.paymentType}</td>
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
        <PaymentForm addPayment={addPayment} />
        <br></br>
        <br></br>
        <h1>Payments</h1>
        {renderedPayments}
      </div>
    );
}

export default Payments