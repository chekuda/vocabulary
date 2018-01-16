const Word = require('../models/word')

//Im currently forcing the user to myself for the database
const USER = 'chekuda'

exports.addnewword = (req, res) => {
  if(!req.body) {
    console.log('Cant add new word')
    res.send({ success: false })
  }

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
      user: USER,
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
    if(err) {
      console.log('Couldnt save the word')
      res.send({ success: false, msg: err })
    } else {
      console.log('Word saved')
      res.send({ success: true, msg: 'Word saved'})
    }
  })
}