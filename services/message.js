const MongoLib = require('../lib/Mongo')
const MessageModel = require('../lib/Models/Message')
const chatService = require('./chat')
const { nanoid } = require('nanoid')
const db = new MongoLib(MessageModel)

async function addMessage(message) {
  let sendedMessage
  let chatExists = await chatService.findByUuid(message.chat)
  console.log(chatExists)

  if (!chatExists) {
    let newChat = await chatService.createChat(message.users, message.chat)
    message.chat = newChat.uuid
    delete message.userTo
  }

  try {
    let finalMessage = {
      chat: message.chat,
      value: message.value,
      user: message.user,
      timestamp: message.timestamp,
      uuid: nanoid(),
    }
    sendedMessage = await db.create(finalMessage)
  } catch (err) {
    console.log(err)

    throw new Error('error sending the message')
  }

  return sendedMessage
}

async function deleteMessage(uuid) {
  console.log({ uuid })

  return await db.remove({ uuid })
}

module.exports = {
  addMessage,
  deleteMessage,
}
