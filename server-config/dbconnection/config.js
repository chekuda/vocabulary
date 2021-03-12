const mongoose = require('mongoose')

module.exports = (url) => {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Database connected'))
  .catch(e => console.log(`Error database ${e}`))
}