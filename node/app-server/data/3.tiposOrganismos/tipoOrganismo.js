const faker = require('faker')

const tiposOrganismos = [
  {
    nivel: 1,
    nombre: 'OrgA',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    nivel: 2,
    nombre: 'OrgB',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = tiposOrganismos
