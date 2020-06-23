const sinon = require('sinon')
const chatMocks = require('./chats')
const usersMock = require('./users')
const messageMock = require('./messages')
const moment = require('moment')
//stubs
const findStub = sinon.stub()
const findOneStub = sinon.stub()
const createStub = sinon.stub()
const removeStub = sinon.stub()

//Chat stubs
const chatArgs = {
  findByUsernameArgs: { users: { $in: 'test' } },
  findByUuidArgs: { chat: 'test' },
  createChat: { users: ['test'], name: 'test', chat: 'testid' },
  deleteChat: { chat: 'test' },
}

findStub
  .withArgs(chatArgs.findByUsernameArgs)
  .returns(chatMocks.findByUsername('test'))
findOneStub
  .withArgs(chatArgs.findByUuidArgs)
  .returns(chatMocks.findByUuid('test'))

findStub.withArgs({}).returns(chatMocks.all())

createStub.withArgs(chatArgs.createChat).returns(chatArgs.createChat)

removeStub.withArgs(chatArgs.deleteChat).returns(chatArgs.deleteChat)
//message stubs

const messageArgs = {
  addMessage: {
    user: 'test',
    chat: 'test',
    value: 'test',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
  },
  findMessages: {
    chat: 'test',
  },
  deleteMessage: {
    uuid: 'test',
  },
}

createStub.withArgs(messageArgs.addMessage).returns(messageArgs.addMessage)

findStub
  .withArgs(messageArgs.findMessages)
  .returns(messageMock.findMessages('test'))

removeStub
  .withArgs(messageArgs.deleteMessage)
  .returns(messageMock.deleteMessage('test'))

//User stubs

const userArgs = {
  findByUsername: {
    username: 'test',
  },
  createUser: {
    username: 'test',
    uuid: 'test',
    name: 'test',
    password: 'test',
    admin: true,
  },
}

findOneStub
  .withArgs(userArgs.findByUsername)
  .returns(usersMock.findByUsername('test'))

createStub
  .withArgs(userArgs.createUser)
  .returns(usersMock.createUser(userArgs.createUser))
class MongoLibMock {
  constructor(model) {}

  async find(params) {
    return findStub(params)
  }
  findOne(params) {
    return findOneStub(params)
  }

  create(params) {
    return createStub(params)
  }

  remove(params) {
    return removeStub(params)
  }
}

module.exports = {
  MongoLibMock,
  findStub,
  findOneStub,
  createStub,
  removeStub,
}
