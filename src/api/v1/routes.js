import express from 'express';

import { getUrlController, createShortUrl } from './controllers/urls';

const router = express.Router();
const apiBase = '/api/v1';

/*
  URL Shortener routes
*/

router.get(`${apiBase}/short_urls`, getUrlController);
router.post(`${apiBase}/short_urls`, createShortUrl);

export default router;
