const listControllers = require('../controllers/controllers')

//API routes
module.exports = (app) => {
  app.route('/api/getvocabulary/:file')
    .get(listControllers.getvocabulary)

  app.route('/api/getListOfTests')
    .get(listControllers.getListOfTests)

  app.route('/api/savetest')
    .post(listControllers.savetest)

  app.route('/api/addnewword')
    .post(listControllers.addnewword)

  app.route('/api/removeword')
    .post(listControllers.removeword)
}