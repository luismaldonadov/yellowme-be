import Joi from 'joi';

import database from '../../../../db';
import errorWrapper from '../../../../utils/errorWrapper';
import shortenUrl from '../../../../components/urls';
import validateUrl from './schema';

async function getUrlController(req, res, next) {
  try {
    const urlParam = req.query.url;
    if (!urlParam) {
      getPagedUrlsController(req, res, next);
    } else {
      validateUrl(urlParam);
      const url = database.get(urlParam);
      switch (urlParam) {
        case null:
          return res.status(404).send({ shortUrl: null });
        default:
          return res.status(200).redirect(301, url);
      }
    }
  } catch (error) {
    return errorWrapper(res, error);
  }
}

async function getPagedUrlsController(req, res, next) {
  try {
    //TODO: Paged urls
    return res.send();
  } catch (error) {
    return errorWrapper(res, error);
  }
}

async function createShortUrlController(req, res, next) {
  try {
    const shortUrl = shortenUrl(req.body.url);
    return res.send({ shortUrl });
  } catch (error) {
    return errorWrapper(res, error);
  }
}

export { getUrlController, getPagedUrlsController, createShortUrlController };
