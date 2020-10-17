import express from 'express';

import {
  createShortUrlController,
  bulkCreateShortUrlController,
  getUrlController,
} from './controllers/urls';

const router = express.Router();
const apiBase = '/api/v1';

/*
  URL Shortener routes
*/

router.get(`${apiBase}/short_urls`, getUrlController);
router.post(`${apiBase}/short_urls`, createShortUrlController);
router.post(`${apiBase}/short_urls/bulk`, bulkCreateShortUrlController);

export default router;
