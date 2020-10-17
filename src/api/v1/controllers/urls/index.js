import Joi from 'joi';

import database from '../../../../db';
import errorWrapper from '../../../../utils/errorWrapper';
import shortenUrl from '../../../../components/urls';
import validateUrl from './schema';

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

export { getUrlController, createShortUrlController };
