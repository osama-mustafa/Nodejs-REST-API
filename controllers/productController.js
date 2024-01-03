const Product = require('../models/product');



const getProducts = async (req, res) => {

};

const getProduct = async (req, res) => {

};

const createProduct = async (req, res) => {
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: product
    });
};

const updateProduct = async (req, res) => {

};

const deleteProduct = async (req, res) => {

};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

