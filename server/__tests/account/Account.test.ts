// @ts-ignore
import request from 'supertest';
import app from '../../src/app';
import Account from '../../src/account/Account';

describe('test mongoose account model', () => {
  test('should return the doc with findById', () => {
    const returnValue = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      apiKey: 'asdasd'
    };

    return Account.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(returnValue);
    });
  });
});

describe('App Test', () => {
  test('POST /account/ should return 200', done => {
    const account = {name:'foo', apiKey: 'asdasd'}
    request(app).post('/account/add').send(account).expect(200, done);
  });
  test('GET /account/all should return 200', done => {
    request(app).get('/account/all').expect(200, done);
  });
  test('GET /account/search?name should return 200', done => {
    request(app).get('/account/search?name=foo').expect(200, done);
  });
  test('GET /account/search?apiKey should return 200', done => {
    request(app).get('/account/search?apiKey=foo').expect(200, done);
  });
});
