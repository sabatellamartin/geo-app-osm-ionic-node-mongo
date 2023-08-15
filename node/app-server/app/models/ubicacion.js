const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const UbicacionSchema = new mongoose.Schema(
  {
    longitud: {
      type: String,
      required: true
    },
    latitud: {
      type: String,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'ubicaciones',
    versionKey: false,
    timestamps: true
  }
)
UbicacionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Ubicacion', UbicacionSchema)
