const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const minifyHTML = require('express-minify-html');

const errorHandler = require('./helpers/errorHandler');
const { version } = require('../package.json');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(compression());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(minifyHTML({
  override: true,
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true,
  },
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get('/versionNum', (req, res) => {
  res.json({ version });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    console.warn(`SyntaxError thrown from ${req.method} request to ${req.originalUrl}`);
    res.status(400).json(errorHandler(400));
  } else {
    next();
  }
});

module.exports = app;
