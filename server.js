// Basic Express server for anime-shop
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static site
app.use(express.static(path.join(__dirname, 'public')));

// API routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders')));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`anime-shop listening on ${PORT}`));
