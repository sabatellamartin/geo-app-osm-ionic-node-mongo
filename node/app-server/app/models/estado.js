const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const EstadoSchema = new mongoose.Schema(
  {
    tipo: {
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
    collection: 'estados',
    versionKey: false,
    timestamps: true
  }
)
EstadoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Estado', EstadoSchema)
