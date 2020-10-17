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
