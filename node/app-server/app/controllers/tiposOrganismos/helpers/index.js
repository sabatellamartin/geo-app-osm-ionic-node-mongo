const { tipoOrganismoExists } = require('./tipoOrganismoExists')
const {
  tipoOrganismoExistsExcludingItself
} = require('./tipoOrganismoExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  tipoOrganismoExists,
  tipoOrganismoExistsExcludingItself,
  getAllItemsFromDB
}
