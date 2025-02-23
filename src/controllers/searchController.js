const searchService = require('../services/searchService');

exports.search = async (req, res) => {
    try {
        const results = await searchService.search(req.query.query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
