const { organismoExists } = require('./organismoExists')
const {
  organismoExistsExcludingItself
} = require('./organismoExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  organismoExists,
  organismoExistsExcludingItself,
  getAllItemsFromDB
}
