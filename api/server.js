const express = require('express');
const usersRoute = require('./users/users-route');
const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/', usersRoute);

server.get('/', (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

server.get('*', (req, res) => {
  res.status(404).json({ message: 'Nothing to see here...' });
});

server.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = server;