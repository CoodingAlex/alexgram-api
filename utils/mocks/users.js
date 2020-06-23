'use strict'
const bcrypt = require('bcrypt')
const users = [
  {
    username: 'alexito',
    uuid: 'yyy-xxx',
    name: 'alex',
    password: bcrypt.hashSync('alex', 5),
    admin: false,
  },
  {
    username: 'pepe',
    uuid: 'yyy-yyy',
    name: 'pepe',
    password: bcrypt.hashSync('pepe', 5),
  },
  {
    username: 'jose',
    uuid: 'yyy-xxz',
    name: 'jose',
    password: bcrypt.hashSync('jose', 5),
    admin: false,
  },
  {
    username: 'maria',
    uuid: 'xxx-xxx',
    name: 'maria',
    password: bcrypt.hashSync('maria', 5),
    admin: true,
  },
  {
    username: 'test',
    uuid: 'test',
    name: 'test',
    password: bcrypt.hashSync('test', 5),
    admin: true,
  },
]

async function findByUsername(username) {
  return users.find((u) => u.username === username)
}

async function createUser(user) {
  return {
    username: user.username,
    name: user.name,
    uuid: user.uuid,
  }
}

module.exports = {
  findByUsername,
  createUser,
}
