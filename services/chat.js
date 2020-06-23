const chatModel = require('../lib/Models/Chat')
const MongoLib = require('../lib/Mongo')
const chatMessageService = require('./chat-message')
const usersService = require('./users')
const { asyncForEach } = require('../utils/utils')
const db = new MongoLib(chatModel)
const { nanoid } = require('nanoid')
async function findByUsername(username) {
  return await db.find({ users: { $in: username } })
}

async function findByUuid(chat) {
  return await db.findOne({ chat })
}

async function findAll() {
  return await db.find({})
}

async function createChat(users, name) {
  if (!name) {
    throw new Error('you need a chat name')
  }

  let chat = nanoid()
  return await db.create({ users, chat, name })
}

async function findMessages(chat) {
  try {
    let messages = await chatMessageService.findMessages(chat)

    return messages
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteChat(chat) {
  return await db.remove({ chat })
}

async function addUsers(chat, users) {
  //if is just one user
  if (!Array.isArray(users)) {
    users = [users]
  }
  const usersExists = await usersService.findUsers(users)

  if (usersExists.length !== users.length) {
    throw new Error('A user does not exist')
  }

  const { users: usersInChat } = await db.findOne({ chat })

  if (usersInChat.includes(users)) {
    throw new Error('A user is already in the chat')
  }
  return await db.updateOne(
    { chat },
    { $addToSet: { users: { $each: users } } }
  )
}
async function deleteUsers(chat, users) {
  try {
    if (!Array.isArray(users)) {
      users = [users]
    }
    return await db.updateOne({ chat }, { $pull: { users: { $in: users } } })
  } catch (err) {
    throw new Error(err)
  }
}
module.exports = {
  findByUsername,
  findByUuid,
  findAll,
  createChat,
  findMessages,
  deleteChat,
  addUsers,
  deleteUsers,
}
