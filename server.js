const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: `${__dirname}/config/.env` });
const connectDB = require('./config/db');
const users = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


// Connect to DB
connectDB();

// Parse application/json
app.use(bodyParser.json());


// Load routes
app.use('/api/v1/users', users);


// app.get('/', (req, res) => {
//     console.log(`Server is running on ${req.hostname}`);
//     res.status(200).json({
//         message: "Server is running"
//     });
// })

app.listen(PORT, () => {
    console.log(`REST API App is working on port ${PORT}`);
});