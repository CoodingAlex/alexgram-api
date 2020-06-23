const usersService = require('./users')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const MongoLib = require('../lib/Mongo')
const apiKeyModel = require('../lib/Models/ApiKey')

const db = new MongoLib(apiKeyModel)

async function signup(user) {
  const { username, password } = user

  if (!username || !password) {
    throw new Error('theres no username or password')
  }

  const userExits = await usersService.findByUsername(username)

  if (userExits) {
    throw new Error('username already exits')
  }

  const myUser = {
    username: user.username,
    name: user.name,
    password: await bcrypt.hash(user.password, 10),
    uuid: nanoid(),
  }

  return await usersService.createUser(myUser)
}

async function getScopes(key) {
  try {
    const { permissions } = await db.findOne({ key })
    return permissions
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  signup,
  getScopes,
}
