const moment = require('moment')
const chat = require('../../services/chat')
let messages = [
  {
    value: 'hola',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'alexito',
    id: '1',
    chat: 'yyy-yyy',
  },
  {
    value: 'como estas',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'pepe',
    id: '2',
    chat: 'yyy-yyy',
  },
  {
    value: 'bien y tu',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'alexito',
    id: '3',
    chat: 'yyy-yyy',
  },
  {
    value: 'va',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'pepe',
    id: '4',
    chat: 'yyy-yyy',
  },
  {
    value: 'se',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'alexito',
    id: '5',
    chat: 'yyy-yyy',
  },
  {
    value: 'hola',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'manuel',
    id: '6',
    chat: 'xxx-yyy',
  },
  {
    value: 'como estas',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'simon',
    id: '7',
    chat: 'xxx-yyy',
  },
  {
    value: 'bien y tu',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'manuel',
    id: '8',
    chat: 'xxx-yyy',
  },
  {
    value: 'va',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'simon',
    id: '9',
    chat: 'xxx-yyy',
  },
  {
    value: 'se',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'manuel',
    id: '10',
    chat: 'xxx-yyy',
  },
  {
    value: 'hola',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'alexito',
    id: '11',
    chat: 'xxx-xxx',
  },
  {
    value: 'como estas',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'maria',
    id: '12',
    chat: 'xxx-xxx',
  },
  {
    value: 'bien y tu',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'alexito',
    id: '13',
    chat: 'xxx-xxx',
  },
  {
    value: 'va',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'maria',
    id: '14',
    chat: 'test',
  },
  {
    value: 'se',
    timestamp: moment().format('MMMM Do YYYY, h:mm'),
    user: 'alexito',
    id: '15',
    chat: 'xxx-xxx',
  },
]

async function addMessage(message) {
  const myMessage = {
    value: message.value,
    timestamp: message.timestamp,
    users: message.users,
    chat: message.chat,
  }

  if (message.userTo) {
    myMessage.userTo = message.userTo
  }
  messages.push(myMessage)

  return myMessage
}

function findMessages(chat) {
  return messages.filter((m) => m.chat === chat)
}
async function deleteMessage(uuid) {
  return { uuid }
}
module.exports = {
  addMessage,
  findMessages,
  deleteMessage,
}
