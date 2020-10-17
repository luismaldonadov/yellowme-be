const express = require('express');

const {
  createShortUrlController,
  bulkCreateShortUrlController,
  getUrlController,
} = require('./controllers/urls');

const router = express.Router();
const apiBase = '/api/v1';

/*
  URL Shortener routes
*/

router.get(`${apiBase}/short_urls`, getUrlController);
router.post(`${apiBase}/short_urls`, createShortUrlController);
router.post(`${apiBase}/short_urls/bulk`, bulkCreateShortUrlController);

module.exports = router;
