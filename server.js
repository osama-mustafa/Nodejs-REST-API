const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`REST API App is working on port ${PORT} and ${process.env.NODE_ENV} environment`);
});