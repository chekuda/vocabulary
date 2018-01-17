const Word = require('../models/word')

//Im currently forcing the user to myself for the database
const USER = 'chekuda'

exports.getvocabulary = (req, res) => {
  const user = req.body.user || USER

  Word.find({ 'user' : USER }, 'wordinEnglish definition', (err, docs) => {
    if (err) {
      res.status(401).send({ success: false, msg: err })
    }

    res.send({ success: true, data: docs })
  })
}

exports.addnewword = (req, res) => {
  const user = req.body.user || USER

  if(!req.body) res.status(401).send({ success: false, msg: 'No Words received in the Backend' })

  const formatTheVAlue = (val) => {
    if (!val || !val.length) return []

    return val.split(',')
      .map(ele => ele[0] === ' '
        ? ele.substring(1)
        : ele
      )
  }

  const formatRequest = () => {
    const { name, noum, verb, adjetive, adverb } = req.body

    return Word({
      user: user,
      wordinEnglish: name,
      definition: {
        noum: formatTheVAlue(noum),
        verb: formatTheVAlue(verb),
        adjetive: formatTheVAlue(adjetive),
        adverb: formatTheVAlue(adverb)
      }
    })
  }

  const newWord = formatRequest()

  newWord.save(err => {
    if(err) res.send({ success: false, msg: err })

    res.send({ success: true, msg: 'Word saved'})
  })
}

exports.removeword = (req, res) => {
  const user = req.body.user || USER

  if(!req.body.word) {
    console.log('Cant remove the word')
    res.send({ success: false, msg: 'Cant remove the word' })
  }

  Word.deleteOne({ 'wordinEnglish' : req.body.word, 'user' : user }, (err, doc) => {
    if(err) res.status(401).send({ success: false, msg: err })

    res.send({ success: true, msg: 'Word removed'})
  })
}