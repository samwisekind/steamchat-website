const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const minifyHTML = require('express-minify-html');

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

app.get('/version', (req, res) => res.json({
  version,
  environment: app.get('env'),
  viewCache: app.get('view cache') || false,
}));

module.exports = app;
