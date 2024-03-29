const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: `${__dirname}/config/.env` });
const connectDB = require('./config/db');
const usersRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml')
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');
const helmet = require('helmet');

// Connect to DB
connectDB();

// Parse application/json
app.use(express.json());

// Enable rate limiting
app.use(rateLimitMiddleware);

// Use Helmet middleware for security
app.use(helmet());

// Load routes
app.use(`${process.env.API_VERSION}/users`, usersRoutes);
app.use(`${process.env.API_VERSION}/auth`, authRoutes);
app.use(`${process.env.API_VERSION}/products`, productRoutes);

// Swagger UI Express for API documentation
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(swaggerFile)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files
app.use(express.static('public'));


module.exports = app;