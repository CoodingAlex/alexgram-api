const { Schema, model } = require('mongoose')

const Chat = new Schema({
  users: [
    {
      type: Schema.Types.String,
      ref: 'Users',
    },
  ],
  chat: {
    type: Schema.Types.String,
  },
  name: {
    type: Schema.Types.String,
  },
})

const myModel = model('Chat', Chat)
module.exports = myModel
