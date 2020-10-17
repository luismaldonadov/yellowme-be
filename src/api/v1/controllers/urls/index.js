import database from '../../../../db';

async function getUrlController(req, res, next) {
  try {
    const url = database.get(req.param.url);

    switch (url) {
      case null:
        res.status(404).send('URL does not exist');
      default:
        break;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export { getUrlController };
