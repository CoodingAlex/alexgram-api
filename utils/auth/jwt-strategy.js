const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const userService = require('../../services/users')
const config = require('../../config')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.jwt_secret,
}

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await userService.findByUsername(payload.username)
      if (!user) {
        return done(null, false)
      }

      //change
      if (user.admin) {
        finalUser.admin = true
      }
      delete user.password

      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  })
)
