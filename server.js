const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: `${__dirname}/config/.env` });
const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`REST API App is working on port ${PORT}`);
})