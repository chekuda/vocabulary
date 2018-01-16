const Quiz = require('../models/quiz')

//Im currently forcing the user to myself for the database
const USER = 'chekuda'

exports.savequiz = (req, res) => {
  const formatRequest = () => {
    const user = req.body.user || USER

    return Quiz({
      user: user,
      date: new Date().getTime(),
      answers: req.body.map(element => {
        return {
          sentenceExample: element.sentenceExample,
          answer: element.answer,
          correct: element.correct,
          date: element.date,
          wordinEnglish: element.wordinEnglish,
          definition: {
            noum: element.definition.noum,
            verb: element.definition.verb,
            adjetive: element.definition.adjetive,
            adverb: element.definition.adverb
          }
        }
      })
    })
  }

  const newquiz = formatRequest()

  newquiz.save(err => {
    if(err) {
      console.log('Couldnt save the word')
      res.send({ success: false, msg: err })
    } else {
      console.log('Word saved')
      res.send({ success: true, msg: 'Word saved'})
    }
  })
}

exports.listOfQuiz = (req, res) => {
  const user = req.body.user || USER

  Quiz.find({ 'user' : USER },'date answers', (err, docs) => {
    if (err) res.send({ success: false })

   res.send({ success: true, listOfQuiz: docs })
  })
}