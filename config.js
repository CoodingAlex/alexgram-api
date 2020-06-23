require('dotenv').config()

module.exports = {
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_test: process.env.JWT_TEST,
    jwt_test_admin: process.env.JWT_TEST_ADMIN,
  },
  mongo: {
    mongo_url: process.env.MONGO_URL,
    mongo_url_test: process.env.MONGO_URL_TEST,
  },
  keys: {
    public: process.env.PUBLIC_API_KEY,
    private: process.env.PRIVATE_API_KEY,
  },
}
