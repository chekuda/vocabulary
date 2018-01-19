const express = require('express')
const wordController = require('../controllers/wordcontrollers')
const quizControllers = require('../controllers/quizcontrollers')
const userControllers = require('../controllers/usercontrollers')

const apirouter = express.Router()

apirouter.post('/getvocabulary', wordController.getvocabulary)

apirouter.post('/getlistofquiz', quizControllers.listOfQuiz)

apirouter.post('/savequiz', quizControllers.savequiz)

apirouter.post('/addnewword', wordController.addnewword)

apirouter.post('/removeword', wordController.removeword)

apirouter.post('/login', userControllers.login)

apirouter.post('/signup', userControllers.signup)

apirouter.get('/verifytoken', userControllers.verifytoken)

exports.apirouter = apirouter