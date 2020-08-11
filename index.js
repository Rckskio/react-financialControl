const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React - não entendi
 */
app.use(express.static(path.join(__dirname, 'frontend/build')));

/**
 * Root Route
 */
app.get('/', (_, response) => {
  response.send({ message: 'Please, access /api' });
});

/**
 * Root Route
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Welcome to Transactions API. Access /transactions and follow the instructions',
  });
});

/**
 * Main routes of app
 */
app.use('/api/transaction', routes);

/**
 * Connection to database
 */
const { DB_CONNECTION } = process.env;

console.log('Starting connection to MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro to connect to MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  console.log('Connected to MongoDB');

  /**
   * Defining port and
   * Initialization of app
   */

  //Port from .env or use 3001
  //to Use different port just add PORT = yourport to .env file
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
});
