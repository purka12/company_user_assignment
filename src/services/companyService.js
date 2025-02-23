const Company = require('../models/companyModel');
const User = require('../models/userModel');

const createCompany = async (data) => {
    const existingUser = await Company.findOne({ name: data.name });
    if (existingUser) {
        throw new Error("name already registered. Use a different name.");
    }
    const company = new Company(data);
    await company.save();
    return company;
};


const getCompanyDetails = async (companyId) => {
    try {
        const company = await Company.findById(companyId)
            .populate("parentCompanyId", "name")
            .lean();

        if (!company) {
            throw new Error("Company not found");
        }
        const subCompanies = await Company.find({ parentCompanyId: companyId }).select("_id name").lean();
        const users = await User.find({ companyId }).select("_id name email role").lean();
        for (let subCompany of subCompanies) {
            const subCompanyUsers = await User.find({ companyId: subCompany._id })
                .select("_id name email role")
                .lean();
            subCompany.users = subCompanyUsers;
        }

        return {
            ...company,
            subCompanies,
            users,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    createCompany,
    getCompanyDetails
};


