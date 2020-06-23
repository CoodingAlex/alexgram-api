const express = require('express')
const debug = require('debug')('my_chat:api:chat')
const chatService = require('../services/chat')
const passport = require('passport')
const chalk = require('chalk')
const Router = express.Router()
require('../utils/auth/jwt-strategy')

Router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    debug(`request GET to /api/chats/`)

    try {
      res.json(await chatService.findByUsername(req.user.username))
    } catch (err) {
      next({ message: err.message })
    }
  }
)

Router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    debug(`request POST to /api/chats/`)
    try {
      const users = [req.user.username, ...req.body.users]
      const { name } = req.body
      const createdChat = await chatService.createChat(users, name)

      res.json({ data: createdChat, message: 'chat created' })
    } catch (err) {
      console.log(err)

      if (err.message === 'An user dont exists') {
        next({ message: err.message, code: 400 })
      }
      next(err)
    }
  }
)

Router.get(
  '/:chat/messages',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    debug(`request GET to /api/chats/:chat`)
    try {
      let messages = await chatService.findMessages(req.params.chat)
      res.json(messages)
    } catch (err) {
      console.log(err)

      next({ message: err.message })
    }
  }
)

Router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    try {
      chatService.deleteChat(req.params.id)
      res.json({ message: 'chat deleted' })
    } catch (err) {
      next({ message: err.message })
    }
  }
)
Router.patch(
  '/:id/add/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const chat = req.params.id
      const { users } = req.body
      await chatService.addUsers(chat, users)
      res.status(201).json({ message: 'chat updated', data: users })
    } catch (err) {
      next(err)
    }
  }
)
Router.patch(
  '/:id/delete/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const chat = req.params.id
      const { users } = req.body
      await chatService.deleteUsers(chat, users)
      res.status(201).json({ message: 'chat updated', data: users })
    } catch (err) {
      console.log(err)

      next(err)
    }
  }
)
module.exports = Router
