const express = require('express');
const Users = require('./users-model'); // change to users-model
const { validateBody, checkUsers } = require('../middleware/middleware');

const router = express.Router();

router.get('/users', checkUsers, (req, res, next) => {
  try {
    res.status(200).json(req.users);
  } catch (error) {
    next(error);
  }
})

router.post('/register', validateBody, (req, res, next) => {
  Users.register(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
})

router.post('/login', validateBody, (req, res, next) => {
  Users.login(req.body)
    .then(auth => {
      if (!auth) {
        res.status(401).json({ message: 'Invalid username or password' });
      } else {
        res.status(200).json({ message: `Welcome, ${req.body.username}!`});
      }
    })
    .catch(next)
})

module.exports = router;