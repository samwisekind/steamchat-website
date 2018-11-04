import mongoose from 'mongoose';

import { mongo } from 'config';

mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.DEBUG === true);

const open = () => new Promise((resolve, reject) => {
  mongoose.connect(mongo.URL, { ...mongo.options, useNewUrlParser: true }, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

const close = () => mongoose.disconnect();

/**
 * Use common mongo event listener to manage connection efficiently
 */
mongoose.connection.on('connected', () => {
  console.info('Mongoose default connection opened');
});

mongoose.connection.on('reconnected', () => {
  console.info('Mongoose default connection re-opened');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected: attempting re-connect');
  // Re-connect
  setTimeout(open, 5000);
});

// On app restart/reload/stop
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export default { open, close };
