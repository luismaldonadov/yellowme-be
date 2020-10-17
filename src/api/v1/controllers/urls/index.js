const database = require('../../../../db');
const errorWrapper = require('../../../../utils/errorWrapper');
const { shortenUrl, processBulkUrls } = require('../../../../components/urls');
const { validateUrl, validateBulkUrls } = require('./schema');

async function getUrlController(req, res, next) {
  try {
    const urlParam = req.query.url;
    validateUrl(urlParam);
    const url = database.get(urlParam);
    switch (url) {
      case null:
        return res.status(404).send({ shortUrl: null });
      default:
        return res.status(200).redirect(302, url);
    }
  } catch (error) {
    return errorWrapper(res, error);
  }
}

async function createShortUrlController(req, res, next) {
  try {
    const longUrl = req.body.url;
    validateUrl(longUrl);
    const shortUrl = shortenUrl(longUrl);
    return res.status(201).send({ shortUrl });
  } catch (error) {
    return errorWrapper(res, error);
  }
}

async function bulkCreateShortUrlController(req, res, next) {
  try {
    const urlsArray = req.body.urls;
    validateBulkUrls(urlsArray);
    const shortUrls = processBulkUrls(urlsArray, 0, []);
    res.status(201).send(shortUrls);
  } catch (error) {
    return errorWrapper(res, error);
  }
}

module.exports = {
  bulkCreateShortUrlController,
  createShortUrlController,
  getUrlController,
};
