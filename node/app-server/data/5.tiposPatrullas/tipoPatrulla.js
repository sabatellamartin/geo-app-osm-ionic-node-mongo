const faker = require('faker')

const tiposPatrullas = [
  {
    nombre: 'A',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = tiposPatrullas
