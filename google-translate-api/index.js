const app = require('./src/app.js');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Express server: running at http://localhost:${port}`);
});
