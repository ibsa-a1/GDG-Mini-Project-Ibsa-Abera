const express = require('express');
const app = express();


app.use(express.json());


app.use('/products', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/orders', require('./routes/orderRoutes'));


module.exports = app;