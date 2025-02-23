const User = require("../models/userModel");
const Company = require("../models/companyModel");

exports.search = async (query, page = 1, limit = 10, sortField = "name", sortOrder = "asc") => {
    const skip = (page - 1) * limit;
    const sortOrderValue = sortOrder === "desc" ? -1 : 1;

    const users = await User.aggregate([
        {
            $match: {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } }
                ]
            }
        },
        {
            $lookup: {
                from: "companies",
                localField: "companyId",
                foreignField: "_id",
                as: "companyDetails"
            }
        },
        { $unwind: "$companyDetails" },
        {
            $project: {
                name: 1,
                email: 1,
                role: 1,
                "companyDetails.name": 1,
                "companyDetails.parentCompanyId": 1
            }
        },
        { $sort: { [sortField]: sortOrderValue } },
        { $skip: skip },
        { $limit: parseInt(limit) }
    ]);


    const companies = await Company.aggregate([
        {
            $match: { name: { $regex: query, $options: "i" } }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "companyId",
                as: "associatedUsers"
            }
        },
        {
            $project: {
                name: 1,
                parentCompanyId: 1,
                associatedUsers: { $slice: ["$associatedUsers", 5] }
            }
        },
        { $sort: { [sortField]: sortOrderValue } },
        { $skip: skip },
        { $limit: parseInt(limit) }
    ]);

    return {
        page: parseInt(page),
        limit: parseInt(limit),
        users,
        companies
    };
};
