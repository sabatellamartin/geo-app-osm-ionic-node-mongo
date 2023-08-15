const { createOrganismo } = require('./createOrganismo')
const { deleteOrganismo } = require('./deleteOrganismo')
const { getAllOrganismos } = require('./getAllOrganismos')
const { getOrganismo } = require('./getOrganismo')
const { getFullOrganismo } = require('./getFullOrganismo')
const { getOrganismos } = require('./getOrganismos')
const { updateOrganismo } = require('./updateOrganismo')

module.exports = {
  createOrganismo,
  deleteOrganismo,
  getAllOrganismos,
  getOrganismo,
  getFullOrganismo,
  getOrganismos,
  updateOrganismo
}
