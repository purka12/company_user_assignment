const User = require('../models/userModel');
const Company = require('../models/companyModel');

exports.search = async (query) => {
    const users = await User.aggregate([
        {
            $match: {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ]
            }
        },
        {
            $lookup: {
                from: 'companies',
                localField: 'companyId',
                foreignField: '_id',
                as: 'companyDetails'
            }
        },
        { $unwind: '$companyDetails' },
        {
            $project: {
                name: 1,
                email: 1,
                role: 1,
                'companyDetails.name': 1,
                'companyDetails.parentCompanyId': 1
            }
        }
    ]);

    const companies = await Company.aggregate([
        {
            $match: { name: { $regex: query, $options: 'i' } }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: 'companyId',
                as: 'associatedUsers'
            }
        },
        {
            $project: {
                name: 1,
                parentCompanyId: 1,
                associatedUsers: { $slice: ['$associatedUsers', 5] }
            }
        }
    ]);

    return { users, companies };
};
