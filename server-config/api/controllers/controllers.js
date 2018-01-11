const commonPaths = require('../../commons-paths/common-paths')
const vocabulary = require('../../../serviceFiles/vocabulary.json')
const fs = require('fs');

const date = new Date().getTime()

exports.getvocabulary = (req, res) => {
  const file = req.params.file
  res.sendFile(`${commonPaths.serviceFiles}/${file}.json`)
}

exports.savetest = (req, res) => {
  fs.writeFile(`${commonPaths.serviceFiles}/listTest/${date}.json`, JSON.stringify(req.body), (err) => {
    if (err){
      res.send({ success: false })
    }

    console.log("The file was succesfully saved!");
    res.send({ success: true })
  });
}

exports.getListOfTests = (req, res) => {
  const path = `${commonPaths.serviceFiles}/listTest`

  const getFileNumber = (file) => {
    return (file.match(/[0-9]+/g) || [])[0]
  }

  const orderList = (list) => {
    return list
            .reduce((acc, ele) => getFileNumber(ele) ? acc.concat(getFileNumber(ele)) : acc, [])
            .sort((a, b) => b - a)
  }

  const createListObject = (list) => {
    const listOrdered = orderList(list)

      return listOrdered.map(element => {
        return {
          file: element,
          data: require(`${path}/${element}.json`)
        }
      })
  }

  fs.readdir(path, (err, items) => {
    if(err) {
      res.send({ success: false })
    }
    orderList(items)
   res.send({ success: true, listOfTest: createListObject(items) })
  });
}

exports.addnewword = (req, res) => {
  if(!req.body || !vocabulary.words || !vocabulary.words.length) {
    console.log('Cant add new word')
    res.send({ success: false })
  }

  const newvocabulary = {
    words: [ ...vocabulary.words ]
  }

  const formatTheVAlue = (val) => {
    if (!val) return []

    return val.split(',').map(ele => {
      if(ele[0] === ' ') {
        return ele.substring(1)
      }
      return ele
    })
  }

  const formatRequest = () => {
    const { name, noum, verb, adjetive, adverb } = req.body
    return {
      wordinEnglish: name,
      definition: {
        noum: formatTheVAlue(noum),
        verb: formatTheVAlue(verb),
        adjetive: formatTheVAlue(adjetive),
        adverb: formatTheVAlue(adverb)
      }
    }
  }

  newvocabulary.words.push(formatRequest())

  fs.writeFile(`${commonPaths.serviceFiles}/vocabulary.json`, JSON.stringify(newvocabulary), (err) => {
    if (err){
      res.send({ success: false })
    }

    console.log("The word was succesfully saved!");
    res.send({ success: true })
  })
}

exports.removeword = (req, res) => {
  if(!req.body.word || !vocabulary.words || !vocabulary.words.length) {
    console.log('Cant remove the word')
    res.send({ success: false })
  }

  const test = vocabulary.words.filter(word => word.wordinEnglish !== req.body.word)
  //save the data in the file
  res.send({ success: test })
}