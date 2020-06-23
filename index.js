'use strict'

const express = require('express')
const chalk = require('chalk')
const helmet = require('helmet')
const app = express()
const port = process.env.NODE_ENV === 'test' ? 3003 : process.env.PORT || 3000
const errorHandler = require('./utils/middlewares/errorHandler')
const config = require('./config')
//db

const MongoLib = require('./lib/Mongo')
//components
const chat = require('./routes/chat')
const message = require('./routes/message')
const auth = require('./routes/auth')
//db connection
if (process.env.NODE_ENV !== 'test') {
  const mongo = new MongoLib()
  mongo.connect(config.mongo.mongo_url)
}

//middleware
app.use(helmet())
app.use(express.json())

//Router
app.use('/api/chats', chat)
app.use('/api/messages', message)
app.use('/api/auth', auth)

//Error Middlewares
app.use(errorHandler)

app.listen(port, () => {
  console.log(
    `${chalk.green('[my chat api]')} server is listening on port ${port}`
  )
})
