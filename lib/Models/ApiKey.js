const { Schema, model } = require('mongoose')

const ApiKey = new Schema({
  key: {
    type: Schema.Types.String,
    unique: true,
  },
  permissions: {},
})

const myModel = model('ApiKey', ApiKey)
module.exports = myModel
