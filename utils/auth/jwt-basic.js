const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const userService = require('../../services/users')

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await userService.findByUsername(username)
      console.log(user)

      if (!user) {
        return done(null, false)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false)
      }
      delete user.password
      done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)
