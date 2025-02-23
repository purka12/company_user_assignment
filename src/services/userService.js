const User = require('../models/userModel');

exports.createUser = async (data) => {
    const user = new User(data);
    await user.save();
    return user;
};

exports.getUserDetails = async (userId) => {
    return await User.findById(userId).populate('companyId');
};
