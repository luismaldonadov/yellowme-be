import { ValidationError } from 'joi';

/**
 * Error wrapper to determine if the provided error is
 * a Joi Validation error or any other error
 * @export
 * @param {Object} res - express response object
 * @param {Error} error - error capture in controller try catch
 * @returns {Object} res
 */
export default function errorWrapper(res, error) {
  switch (error instanceof ValidationError) {
    case true:
      return res.status(422).send({ error: 'ValidationError' });
    default:
      return res
        .status(500)
        .send({ error: error.message || 'Unexpected internal server error' });
  }
}
