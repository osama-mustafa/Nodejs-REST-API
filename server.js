const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: `${__dirname}/config/.env` });
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000;



// Connect to DB
connectDB();

app.listen(PORT, () => {
    console.log(`REST API App is working on port ${PORT}`);
});