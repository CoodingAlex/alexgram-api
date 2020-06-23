function signup(user) {
  return user
}

async function getScopes(apikey) {
  if (apikey === 'invalid') {
    throw new Error('invalid api key')
  }
  return ['[test:test]']
}

module.exports = {
  signup,
  getScopes,
}
