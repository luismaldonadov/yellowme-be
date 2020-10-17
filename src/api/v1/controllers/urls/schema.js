const { isSchema } = require('joi');
import Joi, { ValidationError } from 'joi';

const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const urlSchema = Joi.object({
  url: Joi.string().pattern(urlRegex).required(),
});

function validateUrl(url) {
  const validationResult = urlSchema.validate({ url });
  switch (validationResult.error instanceof ValidationError) {
    case true:
      throw new ValidationError(validationResult.error);
    default:
      break;
  }
}

export default validateUrl;
