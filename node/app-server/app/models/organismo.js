const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OrganismoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      unique: true,
      required: true
    },
    nombre: {
      type: String,
      unique: true,
      required: true
    },
    acronimo: {
      type: String,
      required: true
    },
    abreviacion: {
      type: String,
      required: true
    },
    tipoOrganismo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TipoOrganismo'
    },
    organismo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organismo'
    }
  },
  {
    collection: 'organismos',
    versionKey: false,
    timestamps: true
  }
)
OrganismoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Organismo', OrganismoSchema)
