const mongoose = require('mongoose')
const config = require('../config')

class MongoLib {
  constructor(Model) {
    this.Model = Model
  }

  connect(url) {
    mongoose.set('useCreateIndex', true)

    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('db connected')
      })
      .catch((err) => {
        console.error('error connecting the db ', err)
      })
  }

  disconnect() {
    mongoose.disconnect()
  }

  async find(params) {
    return this.Model.find(params, (err, res) => {
      if (err) {
        throw new Error(err)
      }

      return res
    })
  }
  findOne(params) {
    return this.Model.findOne(params, (err, res) => {
      if (err) {
        throw new Error(err)
      }

      return res
    })
  }

  create(data) {
    try {
      const model = new this.Model(data)
      model.save()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  remove(params) {
    return this.Model.deleteOne(params, (err) => {
      if (err) {
        throw new Error(err)
      }
      return 'succesfully deleted'
    })
  }
  updateOne(params, query) {
    return this.Model.updateOne(
      params,
      query,
      { runValidators: true },
      (err) => {
        if (err) {
          throw new Error(err)
        }
        return 'succesfully deleted'
      }
    )
  }
}

module.exports = MongoLib
