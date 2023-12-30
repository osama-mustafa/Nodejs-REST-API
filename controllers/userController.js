const User = require('../models/user');


const getUsers = async (req, res) => {

};

const getUser = async (req, res) => {

};

const createUser = async (req, res) => {
    console.log(req.body);
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
};

const updateUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

