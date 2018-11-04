const { port } = require('config');
const { name } = require('./package.json');
const database = require('./dist/helpers/mongo');
const app = require('./dist/app').default;

database.default.open();

app.listen(port, () => {
  console.log(`${name} listening on port ${port}`);
});
