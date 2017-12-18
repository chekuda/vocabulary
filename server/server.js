const express = require('express')

const app = express()

port = process.env.port || 5000

app.get('/api', (req, res) => res.send({ name: 'jose' }))

app.listen(port)

console.log('listen on port ', port)