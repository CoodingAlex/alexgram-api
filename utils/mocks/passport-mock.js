function authenticate(type, opts) {
  return (req, res, next) => {
    req.user = {
      username: 'test',
      user: 'test',
      name: 'test',
      uuid: 'test',
    }
    next()
  }
}

module.exports = {
  authenticate,
}
