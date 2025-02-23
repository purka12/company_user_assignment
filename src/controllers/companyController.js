const companyService = require('../services/companyService');

const createCompany = async (req, res) => {
    try {
        const company = await companyService.createCompany(req.body);
        res.status(201).json({
            status: 201,
            message: "Company created successfully",
            data: company
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error.message
        });
    }
};

const getCompanyDetails = async (req, res) => {
    try {
        const company = await companyService.getCompanyDetails(req.params.companyId);
        res.status(200).json({
            status: 200,
            message: "Company details fetched successfully",
            data: company
        });
    } catch (error) {
        res.status(404).json({
            status: 404,
            error: "Company not found"
        });
    }
};

module.exports = {
    createCompany,
    getCompanyDetails
};
