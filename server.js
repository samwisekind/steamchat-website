const { port } = require('config');
const { name } = require('./package.json');
const database = require('./src/helpers/mongo');
const app = require('./src/app');

database.open();

app.listen(port, () => {
  console.log(`${name} listening on port ${port}`);
});
