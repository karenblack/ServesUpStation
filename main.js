const express = require('express');
const app = express();
require('dotenv').config();
PORT = process.env.PORT || 5860;
const db = require('./dbcon.js');
const cors = require('cors');
const bodyParser = require('body-parser');  // don't need? bodyparser is depracated
const mysql = require('mysql');    // don't need because in dbcon.js file
const path = require('path');
app.use(express.static(path.resolve(__dirname, '/servesup/build')));

/*To handle routing*/
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/servesup/build', 'index.html'));
});

app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(cors());


// app.use('/static', express.static('public'));  // not sure about this one for home page
// app.use('/', express.static('public'));        // not sure about this one for home page
app.use('/menuItems', require('./menuItems.js'));
app.use('/productCategories', require('./productCategories.js'));
app.use('/carts', require('./carts.js'));
app.use('/cartItems', require('./cartItems.js'));
app.use('/payments', require('./payments.js'));


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message': err.message})

  return
});

app.listen(PORT, function(){         
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
    });