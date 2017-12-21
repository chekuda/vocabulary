//In order to gather all the paths in the same file
const path = require('path')
const MAIN_ROOT = '../../'

module.exports = {
  serviceFiles: path.resolve(__dirname, `${MAIN_ROOT}/serviceFiles`),
}