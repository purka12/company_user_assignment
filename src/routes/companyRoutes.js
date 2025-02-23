const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/', companyController.createCompany);
router.get('/:companyId', companyController.getCompanyDetails);

module.exports = router;
