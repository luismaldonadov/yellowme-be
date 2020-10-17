import database from '../../../../db';

async function getUrlController(req, res, next) {
  try {
    const urlParam = req.param.url;

    if (!urlParam) {
      getPagedUrlsController(req, res, next);
    } else {
      const url = database.get(urlParam);
      switch (urlParam) {
        case null:
          return res.status(404).send({ short_url: null });
        default:
          return res.send({ short_url: url });
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

export { getUrlController, getPagedUrlsController };
