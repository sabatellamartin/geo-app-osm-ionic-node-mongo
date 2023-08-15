const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OperacionSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Number,
      required: false
    },
    nombre: {
      type: String,
      required: false
    },
    tipo: {      
      type: String,
      required: false
    },
    oficiales: {
      type: Number,
      required: false
    },
    subalternos: {
      type: Number,
      required: false
    },
    vehiculos: {
      type: Number,
      required: false
    },
    timestampFin: {
      type: Number,
      required: false
    },
    timestampInicio: {
      type: Number,
      required: false
    },
    timestampPausa: {
      type: Number,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reporte'
      }
    ],
    mensajes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensaje'
      }
    ],
    estados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado'
      }
    ],
    recorridos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recorrido'
      }
    ]
  },
  {
    collection: 'operaciones',
    versionKey: false,
    timestamps: true
  }
)
OperacionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Operacion', OperacionSchema)