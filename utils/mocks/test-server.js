const express = require('express')
const supertest = require('supertest')
const erroHandler = require('../middlewares/errorHandler')
module.exports = (route) => {
  const app = express()
  app.use(express.json())
  app.use(route)
  app.use(erroHandler)
  return supertest(app)
}
