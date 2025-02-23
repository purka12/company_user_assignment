const searchService = require('../services/searchService');

exports.search = async (req, res) => {
    try {
        const results = await searchService.search(req.query.query);
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
