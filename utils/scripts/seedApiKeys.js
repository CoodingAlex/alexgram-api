const apiKeyModel = require('../../lib/Models/ApiKey')
const MongoLib = require('../../lib/Mongo')
const config = require('../../config')
const db = new MongoLib(apiKeyModel)

const privateScopes = [
  '[admin:true]',
  '[message:create]',
  '[message:read]',
  '[message:delete]',
  '[chat:create]',
  '[chat:read]',
  '[chat:delete]',
]

const publicScopes = [
  '[message:create]',
  '[message:read]',
  '[message:delete]',
  '[chat:create]',
  '[chat:read]',
  '[chat:delete]',
]

async function seedPrivateScopes() {
  await db.create({
    key: config.keys.private,
    permissions: privateScopes,
  })
}

async function seedPublicScopes() {
  await db.create({
    key: config.keys.public,
    permissions: publicScopes,
  })
}

async function run() {
  await db.connect(config.mongo.mongo_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  await seedPrivateScopes()
  await seedPublicScopes()
}

run()

console.log(config.keys)
