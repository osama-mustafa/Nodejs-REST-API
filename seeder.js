const fs = require('node:fs/promises');
const productSeederFile = `${__dirname}/_data/products.json`;
const userSeederFile = `${__dirname}/_data/users.json`;
const Product = require('./models/product');
const User = require('./models/user');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const connectDB = require('./config/db');


connectDB();


const readDataFromFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        return JSON.parse(data);

    } catch (error) {
        console.log(error)
        throw error
    }
}

const seedData = async () => {
    try {
        const userData = await readDataFromFile(userSeederFile);
        const productData = await readDataFromFile(productSeederFile);

        await User.create(userData);
        await Product.create(productData);

        console.log('Data imported successfully');
        await mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data destoryed successfully');
        await mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    seedData();
} else if (process.argv[2] == '-d') {
    deleteData();
}