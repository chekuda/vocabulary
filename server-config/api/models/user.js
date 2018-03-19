const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
  user: String,
  password: String,
  email: String,
  admin: Boolean
})

const User = mongoose.model('user', newSchema)

module.exports = User