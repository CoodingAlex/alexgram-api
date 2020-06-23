const proxyquire = require('proxyquire')
const passportmock = require('../utils/mocks/passport-mock')
const testServer = require('../utils/mocks/test-server')
const chatsMock = require('../utils/mocks/chats')
const assert = require('assert')

describe('routes - chats', () => {
  const route = proxyquire('../routes/chat', {
    // prettier-ignore
    'passport': passportmock,
    // prettier-ignore
    '../services/chat.js' : chatsMock
  })

  const request = testServer(route)

  describe('GET /api/chats', () => {
    it('should response with a 200 status code', (done) => {
      request.get('/').expect(200, done)
    })
    it('should return the list of chat with the username test', async () => {
      const expected = await chatsMock.findByUsername('test')
      request.get('/').end((err, res) => {
        assert.deepEqual(res.body, expected)
      })
    })
  })
  describe('GET /api/chats/messages/:id', () => {
    it('should response with a 200 status code', (done) => {
      request.get('/test/messages').expect(200, done)
    })
    it('should return the list of chat with the username test', () => {
      request.get('/test/messages').end((err, res) => {
        assert.deepEqual(res.body, chatsMock.findMessages('test'))
      })
    })
  })

  describe('POST /api/chats', () => {
    it('should response with a 200 status code', (done) => {
      request
        .post('/')
        .send({ users: ['test'] })
        .expect(200, done)
    })
    const expected = chatsMock.createChat(['test'])
    it('should response with the created chat', (done) => {
      request
        .post('/')
        .send({ users: [] })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: expected,
            message: 'chat created',
          })
          done()
        })
    })
    it('should response with the deleted chat message', (done) => {
      request.delete('/test').end((err, res) => {
        assert.deepEqual(res.body, {
          message: 'chat deleted',
        })
        done()
      })
    })
  })
})
