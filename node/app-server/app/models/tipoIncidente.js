const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TipoIncidenteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'tiposIncidentes',
    versionKey: false,
    timestamps: true
  }
)
TipoIncidenteSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('TipoIncedente', TipoIncidenteSchema)
