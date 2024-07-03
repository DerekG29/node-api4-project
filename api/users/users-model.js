const bcrypt = require('bcrypt');
const users = require('../../data/users');

let id = 1;

function getId() {
  return id++;
}

function get() {
  const userList = users.map(user => {
    const { id, username } = user;
    return { id, username };
  })
  return Promise.resolve(userList);
}

function getByUsername(username) {
  const user = users.find(user => user.username === username);
  return Promise.resolve(user);
}

async function register({ username, password }) {
  const user = await bcrypt.genSalt(10)
  .then(salt => {
    return bcrypt.hash(password, salt);
  })
  .then(hash => {
    const user = { id: getId(), username, hash }
    users.push(user);
    return Promise.resolve(user);
  })
  .catch(err => console.error(err.message))
  return user;
}

async function login({ username, password }) {
  const user = await users.find(user => user.username === username);
  if (!user) {
    return Promise.resolve(false);
  } else {
    const response = await bcrypt
      .compare(password, user.hash)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => console.error(err.message));
    return Promise.resolve(response);
  }
}

module.exports = {
  get,
  getByUsername,
  register,
  login,
}