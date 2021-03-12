require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./server-config/api/routes/routes')
const dbconnection = require('./server-config/dbconnection/config')

const port = 5001
const app = express()

//local 'mongodb://127.0.0.1/vocabulary';
dbconnection('mongodb+srv://checa:200288@cluster0.yv9nn.mongodb.net/vocabulary?retryWrites=true&w=majority')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/api', routes.apirouter)

app.listen(port)

console.log(`listening on port ${port}`)