const moment = require('moment')
const sinon = require('sinon')
const messages = require('./messages')
const { nanoid } = require('nanoid')
let chats = [
  {
    users: ['test', 'fake'],
    chat: 'yyy-yyy',
  },
  {
    users: ['test', 'fake'],
    chat: 'test',
  },
  {
    users: ['fake', 'fake2'],
    chat: 'xxx-xxx',
  },
]

function findByUsername(username) {
  const chat = chats.filter((c) => c.users.includes(username))

  return chat
}

function findByUuid(chat) {
  return chats.filter((c) => c.chat === chat)[0]
}

async function findOne(filter) {
  if (filter.username) {
    return await findByUsername(filter)
  }
  if (filter.uuid) {
    return await findByUuid(filter)
  }
}

function createChat(users) {
  const chat = {
    users,
    uuid: 'testid',
  }

  return chat
}

function findMessages(chat) {
  return messages.findMessages(chat)
}

async function deleteChat(id) {
  return id
}
module.exports = {
  findByUsername,
  all: () => chats,
  findByUuid,
  createChat,
  findMessages,
  deleteChat,
  findOne,
}
