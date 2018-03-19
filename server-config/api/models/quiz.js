const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
  user: String,
  date: String,
  answers: [{
    correct: Boolean,
    sentenceExample: String,
    answer: String,
    wordinEnglish: String,
    definition: {
      noum: Array,
      verb: Array,
      adjetive: Array,
      adverb: Array
    }
  }]
})

const Quiz = mongoose.model('quiz', newSchema)

module.exports = Quiz