const commonPaths = require('../../commons-paths/common-paths')
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