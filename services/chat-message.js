const MongoLib = require('../lib/Mongo')
const MessageModel = require('../lib/Models/Message')
const ChatModel = require('../lib/Models/Chat')
const Messagedb = new MongoLib(MessageModel)
const Chatsdb = new MongoLib(ChatModel)
async function findMessages(chat) {
  try {
    const messages = await Messagedb.find({ chat })
    const { users } = await Chatsdb.findOne({ chat })

    const data = {
      messages,
      users,
    }

    return data
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  findMessages,
}
