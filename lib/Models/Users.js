const { Schema, model } = require('mongoose')

const User = new Schema({
  username: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  uuid: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  name: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  admin: {
    type: Schema.Types.Boolean,
    default: false,
  },
})

const myModel = model('Users', User)
module.exports = myModel
