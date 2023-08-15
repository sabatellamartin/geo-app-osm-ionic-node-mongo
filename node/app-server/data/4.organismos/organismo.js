const faker = require('faker')

const organismos = [
  {
    // organismo_id: null,
    codigo: '1',
    nombre: 'First',
    acronimo: 'FST',
    abreviacion: 'F',
    tipoOrganismo: {
      nivel: '1',
      nombre: 'ORG'
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = organismos
