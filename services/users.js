'use strict'
const UserModel = require('../lib/Models/Users')
const MongoLib = require('../lib/Mongo')
const db = new MongoLib(UserModel)

async function findByUsername(username) {
  try {
    let user = await db.findOne({ username })

    return user
  } catch (err) {
    throw new Error(err)
  }
}

async function findUsers(users) {
  return await db.find({ username: { $in: users } })
}

async function createUser(user) {
  const createdUser = await db.create(user)

  return {
    username: createdUser.username,
    name: createdUser.name,
    uuid: createdUser.uuid,
  }
}

module.exports = {
  findByUsername,
  createUser,
  findUsers,
}
