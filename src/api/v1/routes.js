import express from 'express';

import { getUrlController } from './controllers/urls';

const router = express.Router();
const apiBase = '/api/v1';

/*
  URL Shortener routes
*/

router.get(`${apiBase}/short_urls`, getUrlController);

export default router;
