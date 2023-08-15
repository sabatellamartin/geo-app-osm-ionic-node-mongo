const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ReporteSchema = new mongoose.Schema(
  {
    detalle: {
      type: String,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    },
    operacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Operacion'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'reportes',
    versionKey: false,
    timestamps: true
  }
)
ReporteSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Reporte', ReporteSchema)
