const Product = require('../models/product');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const messages = require('../utils/messages');
const FilterAPI = require('../utils/filterAPI');

const getProducts = asyncErrorHandler(async (req, res) => {
    let query = Product.find();
    let filterAPI = new FilterAPI(query, req.query)
        .select()
        .sort()
        .paginate();

    let result = await filterAPI.mongooseQuery;
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCES,
        count: result.length,
        data: result
    });
});

const getProduct = asyncErrorHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user', 'username');
    if (!product) {
        return res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND,
        });
    }
    res.status(200).json({
        success: true,
        message: messages.success.GET_RESOURCE,
        data: product
    });
});

const createProduct = asyncErrorHandler(async (req, res) => {
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.file?.filename,
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: product
    });
});

const updateProduct = asyncErrorHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND
        });
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
        message: messages.success.UPDATE_RESOUCRE,
        data: product
    });
});

const deleteProduct = asyncErrorHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND,
        });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: messages.success.DELETE_RESOURCE
    });
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}