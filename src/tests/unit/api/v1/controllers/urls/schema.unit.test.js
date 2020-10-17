import validateUrl from '../../../../../../api/v1/controllers/urls/schema';

import { ValidationError } from 'joi';

describe('test url schema ', () => {
  test('throws a Joi Validation error when passed a wrong url', () => {
    expect(() => {
      validateUrl('wawawa');
    }).toThrowError(ValidationError);
  });

  test('throws no error when given correct http url', () => {
    expect(validateUrl('http://test.com')).toBeUndefined();
  });

  test('throws no error when given correct https url', () => {
    expect(validateUrl('http://test.com')).toBeUndefined();
  });
});
