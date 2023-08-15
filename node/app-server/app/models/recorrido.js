const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CoordenadaSchema = new mongoose.Schema(
  {
    latitud: {
      type: Number,
      required: true
    },
    longitud: {
      type: Number,
      required: true
    }
  }, { _id: false }
)

const PosicionSchema = new mongoose.Schema(
  {
    coordenada: CoordenadaSchema,
    timestamp: {
      type: Number,
      required: true
    }
  }, { _id: false }
)

const RecorridoSchema = new mongoose.Schema(
  {
    posiciones: [ PosicionSchema ],
    timestamp: {
      type: Number,
      required: true
    },
    operacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Operacion'
    }
  },
  {
    collection: 'recorridos',
    versionKey: false,
    timestamps: true
  }
)
RecorridoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Coordenada', CoordenadaSchema)
module.exports = mongoose.model('Posicion', PosicionSchema)
module.exports = mongoose.model('Recorrido', RecorridoSchema)
