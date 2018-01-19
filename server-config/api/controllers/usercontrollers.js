const jwt = require('jsonwebtoken')

const testUser = require('../../testUser.json') //Remove this and call database

exports.login = (req, res) => {
  if(!req.body) res.status(401).send({ success: false, msg: 'No User Data retrieved' })

  let token = null
  const { username, password } = req.body

  if(username === testUser.username && password === testUser.password) {
    token = jwt.sign({ admin: false }, process.env.SUPER_SECRET, { expiresIn: '10080m' })

    if(!token) {
      res.status(401).send({ success: false, msg: 'Couldnt create a token' })
    }

    res.send({ success: true, token, msg: 'Token Created' })
  } else {
    res.send({ success: false, msg: 'Wrong credentials' })
  }

}

exports.verifytoken = (req, res) => {
  if(!req.headers.authentication){
    res.status(401).send({ success: false, msg: 'No Authentication header' })
  }
  const token = req.headers.authentication.split('Bearer ')[1]

  jwt.verify(token, process.env.SUPER_SECRET, (err, decoded) => {
    if(err) {
      res.send({success: false, msg: 'No Valid Token'})
    } else {
      res.json({ success: true, msg: 'TOKEN VALID' })
    }
  })
}