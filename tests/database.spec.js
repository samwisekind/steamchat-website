import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { expect } from 'chai';

import database from 'helpers/mongo';

const mockgoose = new Mockgoose(mongoose);

before(async () => {
  await mockgoose.prepareStorage();
  await database.open();
});

after(async () => database.close());

describe('Database connection', () => {
  it('Is mocked', (done) => {
    expect(mockgoose.helper.isMocked()).to.equal(true);
    done();
  });

  it('Connects to the database', (done) => {
    database.open().then(() => {
      done();
    });
  });
});
