const Word = require('../models/word')

//Im currently forcing the user to myself for the database
const USER = 'chekuda'

exports.getvocabulary = (req, res) => {
  const user = USER // This will come from server

  Word.find({ 'user' : user }, 'wordinEnglish definition', (err, docs) => {
    if (err) res.send(err)

    res.send(docs)
  })
}