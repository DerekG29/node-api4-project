const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

function checkUsers(req, res, next) {
  Users.get()
    .then(users => {
      if (!users.length) {
        res.status(200).json({ message: 'No users. Please register a user at /api/register' });
      } else {
        req.users = users;
        next();
      }
    })
    .catch(next);
}

function validateBody(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(422).json({ message: 'Username or password missing' });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  logger,
  validateBody,
  checkUsers
}