require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')

const app = express()
app.use(express.json())

// connect to DB
connectDB()

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
