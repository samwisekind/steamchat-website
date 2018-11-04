require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: 8888,
  mongo: {
    URL: process.env.NODE_MONGO_URL,
    replicaSet: process.env.NODE_MONGO_RS,
    authSource: process.env.NODE_MONGO_AUTH_SOURCE,
    options: {
      user: process.env.NODE_MONGO_USER,
      pass: process.env.NODE_MONGO_PASS,
      ssl: process.env.NODE_MONGO_SSL,
    },
  },
};
