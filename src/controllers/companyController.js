const companyService = require('../services/companyService');

exports.createCompany = async (req, res) => {
    try {
        const company = await companyService.createCompany(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCompanyDetails = async (req, res) => {
    try {
        const company = await companyService.getCompanyDetails(req.params.companyId);
        res.status(200).json(company);
    } catch (error) {
        res.status(404).json({ error: 'Company not found' });
    }
};
