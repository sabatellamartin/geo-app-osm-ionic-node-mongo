const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TipoOrganismoSchema = new mongoose.Schema(
  {
    nivel: {
      type: Number,
      unique: true,
      required: true
    },
    nombre: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'tiposOrganismos',
    versionKey: false,
    timestamps: true
  }
)
TipoOrganismoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('TipoOrganismo', TipoOrganismoSchema)
