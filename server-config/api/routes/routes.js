const express = require('express')
const listControllers = require('../controllers/controllers')

const apirouter = express.Router()

apirouter.get('/getvocabulary/:file', listControllers.getvocabulary)

apirouter.get('/getListOfTests', listControllers.getListOfTests)

apirouter.post('/savetest', listControllers.savetest)

apirouter.post('/addnewword', listControllers.addnewword)

apirouter.post('/removeword', listControllers.removeword)

exports.apirouter = apirouter