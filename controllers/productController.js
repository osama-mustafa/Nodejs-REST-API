const Product = require('../models/product');
const asyncHandler = require('../middlewares/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('user', 'username');
    res.status(200).json({
        success: true,
        message: 'Fetch Products Successfully',
        count: products.length,
        data: products
    })
});

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user', 'username');
    if (!product) {
        return res.status(404).json({
            success: false,
            message: `Product with ${req.params.id} is not found`,
        });
    }
    res.status(200).json({
        success: true,
        message: 'Fetch Product Successfully',
        data: product
    })

});

const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: `Product with ${req.params.id} is not found`
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
    }, {
        runValidators: true,
        new: true
    });

    res.status(200).json({
        success: true,
        message: 'Update product successfully',
        data: product
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: `Product with id ${req.params.id} is not found`,
        });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Delete product successfully'
    });
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

