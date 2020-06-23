const proxyquire = require('proxyquire')
const passportmock = require('../utils/mocks/passport-mock')
const testServer = require('../utils/mocks/test-server')
const authMock = require('../utils/mocks/auth')
const assert = require('assert')

describe('routes - auth', () => {
  const route = proxyquire('../routes/auth', {
    // prettier-ignore
    'passport': passportmock,
    // prettier-ignore
    '../services/auth.js' : authMock
  })

  const request = testServer(route)

  describe('POST /api/auth/sign-up', () => {
    it('should return the created user', (done) => {
      const newUser = {
        username: 'test',
        name: 'test',
        password: 'test',
      }
      request
        .post('/sign-up')
        .send(newUser)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: newUser,
            message: 'user created',
          })
          done()
        })
    })
  })
  describe('POST /api/auth/sign-in', () => {
    it('should return the token', (done) => {
      request
        .post('/sign-in')
        .send({ apikey: 'testapikey' })
        .end((err, res) => {
          assert.ok(res.body, 'error getting the token')
          done()
        })
    })
  })
  describe('POST /api/auth/sign-in with an unvalid api key', () => {
    it('should return an error', (done) => {
      request
        .post('/sign-in')
        .send({ apikey: 'invalid' })
        .end((err, res) => {
          assert.deepEqual(res.body, { message: 'invalid api key token' })

          done()
        })
    })
  })
})
