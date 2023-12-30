const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/user');


const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        message: 'Fetch all users successfully',
        count: users.length,
        data: users
    })
};

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json({
            success: true,
            message: 'Fetch user successfully',
            data: user
        })
    } else {
        res.status(404).json({
            success: false,
            message: `User with id ${req.params.id} is not found`,
        });
    }
});

const createUser = asyncHandler(async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });
});

const updateUser = async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user) {
        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            success: true,
            message: 'Update user successfully',
            data: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: `User with id ${req.params.id} is not found`,
        });
    }
};

const deleteUser = async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Delete user successfully',
        });

    } else {
        res.status(404).json({
            success: false,
            message: `User with id ${req.params.id} is not found`,
        });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

