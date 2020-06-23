'use strict'
const express = require('express')
const debug = require('debug')('my_chat:api:users')
const authService = require('../services/auth')
const Router = express.Router()
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const config = require('../config')
require('../utils/auth/jwt-basic')

Router.post(
  '/sign-in',
  passport.authenticate('basic', { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      return next(boom.unauthorized())
    }

    try {
      const { user, username, uuid, name } = req.user
      const { apikey } = req.body

      if (!apikey) {
        return next(boom.unauthorized('you need an apikey'))
      }

      console.log(apikey)
      const permissions = await authService.getScopes(apikey).catch((err) => {
        throw new Error('invalid api key token')
      })

      const payload = {
        user,
        username,
        uuid,
        name,
        permissions,
      }

      const token = jwt.sign(payload, config.jwt.jwt_secret)
      res.status(200).json({ token })
    } catch (err) {
      return next(boom.unauthorized(err.message))
    }
  }
)

Router.post('/sign-up', async (req, res, next) => {
  const { username, name, password } = req.body

  const user = {
    username,
    name,
    password,
  }
  let userSigned
  try {
    userSigned = await authService.signup(user)
    res.status(201).json({ data: userSigned, message: 'user created' })
  } catch (err) {
    if (err.message === 'username already exits') {
      next({ message: 'username already exits' })
      return
    }
    next(boom.badRequest())
  }
})

module.exports = Router
