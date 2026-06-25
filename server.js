// Main Express server for Maris4u clothing store
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
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => res.json({ message: 'Maris4u API' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Maris4u server listening on port ${PORT}`));
