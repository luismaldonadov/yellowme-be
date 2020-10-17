import request from 'supertest';

import app from '../../../../../../app';
import urlShortener from '../../../../../../components/urls';

const apiBase = '/api/v1';

describe('getUrlContoller', () => {
  const endpoint = '/short_urls';
  test('with valid url param, returns 302', async () => {
    const longUrl = 'https://test1.com';
    const shortUrl = urlShortener(longUrl);

    const { status, redirect, header } = await request(app)
      .get(`${apiBase}${endpoint}`)
      .query({ url: shortUrl });

    expect(status).toBe(302);
    expect(redirect).toBe(true);
    expect(header.location).toEqual(longUrl);
  });

  test('with non existent url, returns 404', async () => {
    const unexistentShortUrl = 'https://test2.com';

    const { status, body } = await request(app)
      .get(`${apiBase}${endpoint}`)
      .query({ url: unexistentShortUrl });

    expect(status).toBe(404);
    expect(body).toStrictEqual({ shortUrl: null });
  });

  test('with invalid url, returns 422', async () => {
    const invalidUrl = 'https://test3';

    const { status, body } = await request(app)
      .get(`${apiBase}${endpoint}`)
      .query({ url: invalidUrl });

    expect(status).toBe(422);
    expect(body).toStrictEqual({ error: 'ValidationError' });
  });
});

describe('createShortUrlContoller', () => {
  const endpoint = '/short_urls';
  const shortUrlDomainLength = String(process.env.SHORT_URL_DOMAIN).length;
  const generatedShortUrlLength = parseInt(process.env.MAX_LENGTH_SHORT_URL);

  test('with valid url param creates a url and returns 201. On new request returns a 302', async () => {
    const longUrl = 'https://test4.com';

    const { status, body } = await request(app)
      .post(`${apiBase}${endpoint}`)
      .send({ url: longUrl });

    expect(status).toBe(201);
    expect(body.shortUrl.length).toBe(
      shortUrlDomainLength + generatedShortUrlLength + 1,
    );

    const { status: redirectStatus, redirect, header } = await request(app)
      .get(`${apiBase}${endpoint}`)
      .query({ url: body.shortUrl });

    expect(redirectStatus).toBe(302);
    expect(redirect).toBe(true);
    expect(header.location).toEqual(longUrl);
  });

  test('returns 422 for an invalid url format', async () => {
    const longUrl = 'https://test5';

    const { status } = await request(app)
      .post(`${apiBase}${endpoint}`)
      .send({ url: longUrl });

    expect(status).toBe(422);
  });
});
