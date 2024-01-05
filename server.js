const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: `${__dirname}/config/.env` });
const connectDB = require('./config/db');
const usersRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Parse application/json
app.use(bodyParser.json());

// Load routes
app.use(`${process.env.API_VERSION}/users`, usersRoutes);
app.use(`${process.env.API_VERSION}/auth`, authRoutes);
app.use(`${process.env.API_VERSION}/products`, productRoutes);

app.listen(PORT, () => {
    console.log(`REST API App is working on port ${PORT}`);
});