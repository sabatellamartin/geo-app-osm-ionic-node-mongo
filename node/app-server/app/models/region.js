const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const RegionSchema = new mongoose.Schema(
  {
    codigo: {
      type: Number,
      unique: true,
      required: true
    },
    nombre: {
      type: String,
      unique: true,
      required: true
    },
    regiones: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'regiones',
    versionKey: false,
    timestamps: true
  }
)
RegionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Region', RegionSchema)
