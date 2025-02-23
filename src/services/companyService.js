const Company = require('../models/companyModel');

exports.createCompany = async (data) => {
    const company = new Company(data);
    await company.save();
    return company;
};

exports.getCompanyDetails = async (companyId) => {
    return await Company.findById(companyId).populate('parentCompanyId');
};
