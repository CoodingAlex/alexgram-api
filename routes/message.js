'use strict'
const express = require('express')
const passport = require('passport')
const moment = require('moment')

require('../utils/auth/jwt-strategy')

const debug = require('debug')('my_chat:api:message')
const messagesService = require('../services/message')
const Router = express.Router()

Router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    req.body.users = req.body.users || []
    const message = {
      users: [req.user.username, ...req.body.users],
      user: req.user.username,
      chat: req.body.chat,
      value: req.body.value,
      timestamp: moment().format('MMMM Do YYYY, h:mm'),
    }

    try {
      const sendedMessage = await messagesService.addMessage(message)
      res.status(201).json({ data: sendedMessage, message: 'message sended' })
    } catch (err) {
      debug(`[Error in route /api/messages] ${err.message} || ${err.stack}`)
      next({ message: err.message, code: 400 })
    }
  }
)

Router.delete('/:id', async (req, res, next) => {
  try {
    messagesService.deleteMessage(req.params.id)
    res.json({ message: `message deleted` })
  } catch (error) {
    next({ message: error.message })
  }
})

module.exports = Router
