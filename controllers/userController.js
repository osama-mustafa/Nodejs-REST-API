const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const User = require('../models/user');
const FilterAPI = require('../utils/filterAPI');
const messages = require('../utils/messages');


const getUsers = asyncErrorHandler(async (req, res) => {
    let query = User.find();
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

const getUser = asyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json({
            success: true,
            message: messages.success.GET_RESOURCE,
            data: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND,
        });
    }
});

const createUser = asyncErrorHandler(async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    res.status(201).json({
        success: true,
        message: messages.success.CREATE_RESOURCE,
        data: user
    });
});

const updateUser = asyncErrorHandler(async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user) {
        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            success: true,
            message: messages.success.UPDATE_RESOUCRE,
            data: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND,
        });
    }
});

const deleteUser = asyncErrorHandler(async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: messages.success.DELETE_RESOURCE,
        });

    } else {
        res.status(404).json({
            success: false,
            message: messages.error.RESOURCE_NOT_FOUND,
        });
    }
});

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

