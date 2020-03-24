const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const compression = require('compression');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(logger('dev'));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// compress all responses
app.use(compression());

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require('./routes/api-routes'));
app.use(require('./routes/html-routes'));

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});
