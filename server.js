const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/client/build/'))

app.get('/', (req, res) => res.sendFile(__dirname + '/client/build/index.html'))

app.get('/api', (req, res) => res.send({ name: 'jose' }))

app.listen(port)

console.log('listen on port ', port)