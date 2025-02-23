const User = require('../models/userModel');

const createUser = async (data) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("Email already registered. Use a different email.");
    }
    const user = new User(data);
    await user.save();
    return user;
};

const getUserDetails = async (userId) => {
    return await User.findById(userId).populate('companyId');
};


module.exports = {
    createUser,
    getUserDetails
};