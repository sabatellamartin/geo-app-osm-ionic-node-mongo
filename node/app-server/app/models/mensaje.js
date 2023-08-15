const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const MensajeSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: false
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
    collection: 'mensajes',
    versionKey: false,
    timestamps: true
  }
)
MensajeSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Mensaje', MensajeSchema)
