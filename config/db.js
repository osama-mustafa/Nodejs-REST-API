const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose
            .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@devcamper.fmc3r4n.mongodb.net/${process.env.DB_NAME}`);
        console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;