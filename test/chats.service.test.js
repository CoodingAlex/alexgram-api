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
const assert = require('assert')

describe('services - chats', () => {
  const chatService = proxyquire('../services/chat', {
    // prettier-ignore
    '../lib/Models/Chat': ModelMock,
    '../lib/Mongo': MongoLibMock,
    './users': usersMock,
    './message': messagesMock,
    'nanoid': {nanoid:()=> 'testid'} // prettier-ignore
  })

  describe('chats - findByUsername', () => {
    it('should call the find mongolib service', async () => {
      chatService.findByUsername('test')
      chatMocks.findByUsername('test')

      assert.deepEqual(findStub.called, true)
    })
    it('should return the chats with the username test', async () => {
      const chats = await chatService.findByUsername('test')
      console.log(chats)

      assert.deepEqual(chats, chatMocks.findByUsername('test'))
    })
  })

  describe('chats findByUuid', () => {
    it('should call the findOne mongolib service', () => {
      chatService.findByUuid('test')

      assert.deepEqual(findOneStub.called, true)
    })
    it('should returns the chat with the uuid', async () => {
      const chat = await chatService.findByUuid('test')
      const expected = chatMocks.findByUuid('test')

      assert.deepEqual(chat, expected)
    })
  })
  describe('chats findAll', () => {
    it('should returns all the chats', async () => {
      const chat = await chatService.findAll()
      const expected = chatMocks.all('test')

      assert.deepEqual(chat, expected)
    })
  })
  describe('chats create', () => {
    it('should returns the created chat', async () => {
      const chat = await chatService.createChat(['test'], 'test')

      assert.deepEqual(chat, {
        chat: 'testid',
        name: 'test',
        users: ['test'],
      })
    })
  })

  describe('delete chat', () => {
    it('should returns the chat uuid deleted', async () => {
      const chat = await chatService.deleteChat('test')
      assert.deepEqual(chat, { chat: 'test' })
    })
  })
})
