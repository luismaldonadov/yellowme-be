import database from '../../../../db';
import shortenUrl from '../../../../components/urls';

async function getUrlController(req, res, next) {
  try {
    const urlParam = req.query.url;

    if (!urlParam) {
      getPagedUrlsController(req, res, next);
    } else {
      const url = database.get(urlParam);
      switch (urlParam) {
        case null:
          return res.status(404).send({ shortUrl: null });
        default:
          return res.send({ shortUrl: url });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function getPagedUrlsController(req, res, next) {
  try {
    //TODO: Paged urls
    return res.send();
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function createShortUrl(req, res, next) {
  try {
    const shortUrl = shortenUrl(req.body.url);
    return res.send({ shortUrl });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}

export { getUrlController, getPagedUrlsController, createShortUrl };
