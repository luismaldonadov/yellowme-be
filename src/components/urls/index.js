import database from '../../db';

/**
 * Creates a short url with a provided long url.
 * If already created returns the existent
 * short url
 * @export
 * @param {String} longUrl
 * @returns {String}
 */
function shortenUrl(longUrl) {
  const shortPath = getRandomUrl('');
  const fullShortUrl = `${process.env.SHORT_URL_DOMAIN}/${shortPath}`;
  database.set(fullShortUrl, longUrl);
  return fullShortUrl;
}

/**
 * Recurses on building short urls for a given
 * array of urls
 * @param {Array} urls - array of url as strings
 * @param {Number} urlIndex - url index of url that is being processd
 * @param {Array} shortUrls - resulting array of objects with shortUrl and url
 * @returns {Array}
 */
function processBulkUrls(urls, urlIndex, shortUrls) {
  if (urlIndex >= urls.length) {
    return shortUrls;
  }
  const longUrl = urls[urlIndex];
  const shortPath = getRandomUrl('');
  const fullShortUrl = `${process.env.SHORT_URL_DOMAIN}/${shortPath}`;
  shortUrls.push({ shortUrl: fullShortUrl, url: longUrl });
  urlIndex++;
  return processBulkUrls(urls, urlIndex, shortUrls);
}

/**
 * Recurses until building a short url provided
 * by the length of the enviromente variable. Url
 * alternates between a character and a letter
 * @param {String} randomUrl
 * @returns {String}
 */
function getRandomUrl(randomUrl) {
  if (randomUrl.length == process.env.MAX_LENGTH_SHORT_URL) {
    return randomUrl;
  }

  const urlLength = randomUrl.length;
  switch (urlLength % 2) {
    case 0:
      const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomCharacter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      return getRandomUrl(`${randomUrl}${randomCharacter}`);
    default:
      const randomNumber = Math.floor(Math.random() * Math.floor(9));
      return getRandomUrl(`${randomUrl}${randomNumber}`);
  }
}

module.exports = {
  processBulkUrls,
  shortenUrl,
};
