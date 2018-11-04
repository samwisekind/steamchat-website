import request from 'supertest';
import { expect } from 'chai';

import app from 'app';

import packageFile from '../package.json';

describe('App info', () => {
  it('Got version number', (done) => {
    request(app)
      .get('/versionNum')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.version).to.equal(packageFile.version);
        done();
      });
  });
});
