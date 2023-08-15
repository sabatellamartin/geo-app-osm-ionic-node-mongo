const faker = require('faker')

const tiposIncidentes = [
  {
    nombre: 'Incident',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = tiposIncidentes
