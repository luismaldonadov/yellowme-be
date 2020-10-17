const { ValidationError } = require('joi');
const Joi = require('joi');

const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const urlSchema = Joi.object({
  url: Joi.string().pattern(urlRegex).required(),
});

const bulkUrlSchema = Joi.object({
  urls: Joi.array().items(Joi.string().pattern(urlRegex)).required().min(1),
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

function validateBulkUrls(urls) {
  const validationResult = bulkUrlSchema.validate({ urls });
  switch (validationResult.error instanceof ValidationError) {
    case true:
      throw new ValidationError(validationResult.error);
    default:
      break;
  }
}

module.exports = {
  validateUrl,
  validateBulkUrls,
};
