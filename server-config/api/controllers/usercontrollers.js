const jwt = require('jsonwebtoken')
const testUser = require('../../testUser.json') //Remove this and call database

exports.login = (req, res) => {
  if(!req.body) res.status(401).send({ success: false, msg: 'No User Data retrieved' })

  let token = null
  const { username, password } = req.body

  if(username === testUser.username && password === testUser.password) {
    token = jwt.sign({ admin: false }, process.env.SUPER_SECRET, { expiresIn: '2m' })

    if(!token) {
      res.status(401).send({ success: false, msg: 'Couldnt create a token' })
    }

    res.send({ success: true, token, msg: 'Token Created' })
  } else {
    res.send({ success: false, msg: 'Wrong credentials' })
  }

}