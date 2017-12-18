const express = require('express')

const app = express()

port = process.env.port || 3000

//app.use(express.static(__dirname + '/client/build/'))

//app.get('/', (req, res) => res.sendFile(__dirname + '/client/build/index.html'))
app.get('/', (req, res) => res.send('JOSE'))
//app.get('/api', (req, res) => res.send({ name: 'jose' }))

app.listen(port)

console.log('listen on port ', port)