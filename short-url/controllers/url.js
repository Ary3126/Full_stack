const { nanoid } = require('nanoid');
const urlModel = require('../models/url');

async function generateNewShortUrl(req, res) {
    const body = req.body;
    const redirectUrl = body.redirectUrl || body.url;

    if (!redirectUrl) {
        return res.status(400).json({ error: 'redirectUrl is required' });
    }

    const shortid = nanoid(8);
    const shortUrl = `http://localhost:8181/${shortid}`;

    await urlModel.create({
        shortId: shortid,
        redirectUrl,
        visithistory: [],
    });

    if (req.get('Accept') && req.get('Accept').includes('text/html')) {
        return res.render('result', { shortUrl, redirectUrl });
    }

    return res.json({ shortUrl });
}

async function handleGetAllUrls(req, res) {
    const allUrls = await urlModel.find({}).sort({ createdAt: -1 });
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    if (req.get('Accept') && req.get('Accept').includes('text/html')) {
        return res.render('list', { urls: allUrls, baseUrl });
    }

    return res.json({ urls: allUrls });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await urlModel.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({
        totalClicks: result.visithistory.length,
        analytics: result.visithistory,
    });
}

module.exports = {
    generateNewShortUrl,
    handleGetAllUrls,
    handleGetAnalytics,
};