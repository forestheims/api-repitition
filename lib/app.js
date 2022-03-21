const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/books/', require('./controllers/books'));
app.use('/api/v1/resins/', require('./controllers/resins'));
app.use('/api/v1/rocks/', require('./controllers/rocks'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
