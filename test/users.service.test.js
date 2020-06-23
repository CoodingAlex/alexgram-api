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
const assert = require('assert')
const moment = require('moment')

describe('services - chats', () => {
  const userService = proxyquire('../services/users', {
    // prettier-ignore
    '../lib/Models/Chat': ModelMock,
    '../lib/Mongo': MongoLibMock,
  })

  describe('users - findByUsername', () => {
    it('should return the user with the usename', async () => {
      const user = await userService.findByUsername('test')
      const expected = await usersMock.findByUsername('test')

      assert.deepEqual(user, expected)
    })
  })
  describe('users - createUser', () => {
    it('should return the user with the usename', async () => {
      const user = await userService.createUser({
        username: 'test',
        uuid: 'test',
        name: 'test',
        password: 'test',
        admin: true,
      })
      const expected = await usersMock.createUser({
        username: 'test',
        uuid: 'test',
        name: 'test',
        password: 'test',
        admin: true,
      })

      assert.deepEqual(user, expected)
    })
  })
})
