const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TipoPatrullaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'tiposPatrullas',
    versionKey: false,
    timestamps: true
  }
)
TipoPatrullaSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('TipoPatrulla', TipoPatrullaSchema)
