const PORT = process.env.PORT || 5000;
// to use process.env.PORT you can run PORT=5500 node app.js

const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const custom404 = require('./middleware/404');
const errorHandler = require('./middleware/error-handler');

// MIDDLEWARE
// express.static "connects" our front end.
app.use(express.static('./public'));
// need to use this middleware to convert req to json to be able to show data in req.body
app.use(express.json());

// ROUTES
app.use('/api/v1/tasks', tasks);

app.use(custom404);
app.use(errorHandler);

// we connect to the DB first, if connected only then we spin up a server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECT_URI);
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
