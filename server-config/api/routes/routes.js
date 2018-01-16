const express = require('express')
const listControllers = require('../controllers/controllers')
const addWordController = require('../controllers/addnewword')
const getVocabularyController = require('../controllers/getvocabulary')

const apirouter = express.Router()

apirouter.get('/getvocabulary', getVocabularyController.getvocabulary)

apirouter.get('/getListOfTests', listControllers.getListOfTests)

apirouter.post('/savetest', listControllers.savetest)

apirouter.post('/addnewword', addWordController.addnewword)

apirouter.post('/removeword', listControllers.removeword)

exports.apirouter = apirouter