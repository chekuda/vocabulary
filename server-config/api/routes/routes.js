const express = require('express')
const listControllers = require('../controllers/controllers')
const wordController = require('../controllers/wordcontrollers')

const apirouter = express.Router()

apirouter.get('/getvocabulary', wordController.getvocabulary)

apirouter.get('/getListOfTests', listControllers.getListOfTests)

apirouter.post('/savetest', listControllers.savetest)

apirouter.post('/addnewword', wordController.addnewword)

apirouter.post('/removeword', wordController.removeword)

exports.apirouter = apirouter