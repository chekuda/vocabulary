require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./server-config/api/routes/routes')
const dbconnection = require('./server-config/dbconnection/config')

const port = 5000
const app = express()

dbconnection.createMongooseConection()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/api', routes.apirouter)

app.listen(port)

console.log(`listening on port ${port}`)