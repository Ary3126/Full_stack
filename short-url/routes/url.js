const express = require('express');
const { generateNewShortUrl, handleGetAllUrls, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

router.get('/list', handleGetAllUrls);
router.post('/', generateNewShortUrl);
router.post('/shorten', generateNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;  