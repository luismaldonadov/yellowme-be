import database from '../../db';

/**
 * Creates a short url with a provided long url.
 * If already created returns the existent
 * short url
 * @export
 * @param {String} longUrl
 * @returns {String}
 */
export default function shortenUrl(longUrl) {
  const shortUrl = database.get(longUrl);

  switch (shortUrl) {
    case null:
      const shortPath = getRandomUrl('');
      const fullShortUrl = `${process.env.SHORT_URL_DOMAIN}/${shortPath}`;
      database.set(fullShortUrl, longUrl);
      return fullShortUrl;
    default:
      return shortUrl;
  }
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
