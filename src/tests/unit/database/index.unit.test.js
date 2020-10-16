import database from '../../../db';

describe('test fake database implementation', () => {
  test('returns null for non existent record on databse', () => {
    const result = database.get('test_test');
    expect(result).toEqual(null);
  });

  test('returns record from databse after created', () => {
    const insertResult = database.set('test1', 'value');
    const record = database.get('test1');
    expect(insertResult).toEqual(true);
    expect(record).toEqual('value');
  });
});
