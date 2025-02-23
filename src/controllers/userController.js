const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error.message
        });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await userService.getUserDetails(req.params.userId);
        res.status(200).json({
            status: 200,
            message: "User details fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(404).json({
            status: 404,
            error: "User not found"
        });
    }
};

module.exports = {
    createUser,
    getUserDetails
};

