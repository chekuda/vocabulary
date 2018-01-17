const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
  user: String,
  wordinEnglish: String,
  definition: {
    noum: Array,
    verb: Array,
    adjetive: Array,
    adverb: Array
  }
})

const Word = mongoose.model('word', newSchema)

module.exports = Word