const { Schema, model } = require('mongoose')
const Users = require('./Users')
const Chat = require('./Chat')
const Message = new Schema({
  value: Schema.Types.String,
  timestamp: Schema.Types.String,
  user: {
    type: Schema.Types.String,
    ref: 'Users',
  },
  uuid: Schema.Types.String,
  chat: {
    type: Schema.Types.String,
    ref: 'Chats',
  },
})

const myModel = model('Message', Message)
module.exports = myModel
