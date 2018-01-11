const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const commonPaths = require('./server-config/commons-paths/common-paths')
const routes = require('./server-config/api/routes/routes')

const app = express()

app.use(cors())

const port = 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/api', routes.apirouter)

app.listen(port)

console.log(`listening on port ${port}`)