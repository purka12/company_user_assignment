const searchService = require("../services/searchService");

const search = async (req, res) => {
    try {
        const { query } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sortField || "name";
        const sortOrder = req.query.sortOrder || "asc";

        const results = await searchService.search(query, page, limit, sortField, sortOrder);

        res.status(200).json({
            status: 200,
            message: "Search results fetched successfully",
            data: results
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};

module.exports = { search };
