const proxyquire = require('proxyquire')
const {
  MongoLibMock,
  createStub,
  findOneStub,
  findStub,
  removeStub,
} = require('../utils/mocks/mongoLib')
const chatMocks = require('../utils/mocks/chats')
const ModelMock = require('../utils/mocks/Model')
const usersMock = require('../utils/mocks/users')
const messagesMock = require('../utils/mocks/messages')
const chatsMock = require('../utils/mocks/chats')
const assert = require('assert')
const moment = require('moment')

describe('services - messages', () => {
  const messageService = proxyquire('../services/message', {
    // prettier-ignore
    '../lib/Models/Message': ModelMock,
    '../lib/Mongo': MongoLibMock,
    './users': usersMock,
    './chat': chatsMock,
  })

  describe('messages - deleteMessage', () => {
    it('should return the created chat', async () => {
      const messages = await messageService.deleteMessage('test')

      const expected = await messagesMock.deleteMessage('test')

      assert.deepEqual(messages, expected)
    })
  })
})
