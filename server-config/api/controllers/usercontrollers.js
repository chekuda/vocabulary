const jwt = require('jsonwebtoken')
const User = require('../models/user')

const createToken = () => {
  return jwt.sign({ admin: false }, process.env.SUPER_SECRET, { expiresIn: 604800 })
}

exports.login = (req, res) => {
  if(!req.body) res.status(401).send({ success: false, msg: 'No User Data retrieved' })

  const { username, password } = req.body

  User.find({ 'user' : username, 'password' : password }, (err, docs) => {
    if(err || !docs.length) {
      res.send({ success: false, msg: 'Wrong credentials' })
    } else {
      const token = createToken()
      if(!token) {
        res.status(401).send({ success: false, msg: 'Couldnt create a token' })
      }

      res.send({ success: true, token, msg: 'Token Created', username })
    }
  })
}

exports.signup = (req, res) => {
  if(!req.body) res.status(401).send({ success: false, msg: 'No User Data retrieved' })

  const { username, password, email, admin = false } = req.body

  User.find({ 'user' : username }, (err, docs) => {
    if(err || docs.length){
      res.send({ success: false, msg: 'User already exist'})
    } else {
      const newUser = User({
        user: username,
        password,
        email
      })
      const token = createToken()

      if(!token) {
        res.status(401).send({ success: false, msg: 'Couldnt create a token' })
      }

      newUser.save(err => {
        if(err) res.send({ success: false, msg: err })

        res.send({ success: true, msg: 'User saved', username, token })
      })
    }
  })
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