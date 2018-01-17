const express = require('express')
const wordController = require('../controllers/wordcontrollers')
const quizControllers = require('../controllers/quizcontrollers')
const userControllers = require('../controllers/usercontrollers')

const apirouter = express.Router()

apirouter.get('/getvocabulary', wordController.getvocabulary)

apirouter.get('/getlistofquiz', quizControllers.listOfQuiz)

apirouter.post('/savequiz', quizControllers.savequiz)

apirouter.post('/addnewword', wordController.addnewword)

apirouter.post('/removeword', wordController.removeword)

apirouter.post('/userlogin', userControllers.login)

exports.apirouter = apirouter