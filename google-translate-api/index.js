const app = require('./src/app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express server: running at http://localhost:${port}`);
});
