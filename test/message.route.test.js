const proxyquire = require('proxyquire')
const passportmock = require('../utils/mocks/passport-mock')
const testServer = require('../utils/mocks/test-server')
const messagesMock = require('../utils/mocks/messages')
const assert = require('assert')

describe('routes - messages', () => {
  const route = proxyquire('../routes/message', {
    // prettier-ignore
    'passport': passportmock,
    // prettier-ignore
    '../services/message.js' : messagesMock
  })

  const request = testServer(route)

  describe('POST /api/messages', () => {
    const newMessage = {
      chat: 'testchat',
      value: 'testmessage',
    }
    it('shoud response with a 201 status code', (done) => {
      request.post('/').send(newMessage).expect(201, done)
    })
    it('should response with the created chat ', (done) => {
      request
        .post('/')
        .send(newMessage)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: {
              ...newMessage,
              timestamp: res.body.data.timestamp,
              users: ['test'],
            },
            message: 'message sended',
          })

          done()
        })
    })
  })

  describe('DELETE /api/message/:id', () => {
    it('should response with a deleted message', (done) => {
      request.delete('/test').end((err, res) => {
        assert.deepEqual(res.body, { message: 'message deleted' })
        done()
      })
    })
  })
})
