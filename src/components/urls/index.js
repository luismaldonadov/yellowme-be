const database = require('db');

/**
 * Creates a short url with a provided long url.
 * If already created returns the existent
 * short url
 * @export
 * @param {String} longUrl
 * @returns {String}
 */
function shortenUrl(longUrl) {
  const shortPath = getRandomUrl();
  const fullShortUrl = `${process.env.SHORT_URL_DOMAIN}/${shortPath}`;
  database.set(fullShortUrl, longUrl);
  return fullShortUrl;
}

/**
 * Builds short urls for a given
 * array of urls
 * @param {Array} urls - array of url as strings
 * @returns {Array}
 */
function processBulkUrls(urls) {
  const shortUrls = urls.map((longUrl) => {
    const shortPath = getRandomUrl();
    const fullShortUrl = `${process.env.SHORT_URL_DOMAIN}/${shortPath}`;
    database.set(fullShortUrl, longUrl);
    return { shortUrl: fullShortUrl, url: longUrl };
  });
  return shortUrls;
}

/**
 * Builds a short url provided
 * by the length of the enviroment variable. Url
 * alternates between a character and a letter
 * @param {String} randomUrl
 * @returns {String}
 */
function getRandomUrl() {
  let randomUrl = '';
  for (let index = 0; index < process.env.MAX_LENGTH_SHORT_URL; index++) {
    switch (index % 2) {
      case 0:
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomCharacter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        randomUrl = `${randomUrl}${randomCharacter}`;
        break;
      default:
        const randomNumber = Math.floor(Math.random() * Math.floor(9));
        randomUrl = `${randomUrl}${randomNumber}`;
        break;
    }
  }
  return randomUrl;
}

module.exports = {
  processBulkUrls,
  shortenUrl,
};
