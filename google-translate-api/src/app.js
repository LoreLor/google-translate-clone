const router = require('./router/index')
const express = require('express');
const bodyParser =require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const dotenv =require('dotenv');
dotenv.config()




// app.use(express.urlencoded());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });


app.use('/', router)


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});

module.exports = app;
