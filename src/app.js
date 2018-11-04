import express from 'express';
import cors from 'cors';
import compression from 'compression';
import minifyHTML from 'express-minify-html';

import errorHandler from 'helpers/errorHandler';
import { version } from '../package.json';
import routes from './routes';

const app = express();

app.use(cors());
app.use(compression());
app.use(minifyHTML({
  override: true,
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true,
  },
}));

app.use(express.static('./public'));

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

export default app;
