/* EJEMPLO DE HERENCIA */
/*
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const extendSchema = require('mongoose-extend-schema')

const VehiculoSchema = new mongoose.Schema(
  {
    _type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection : 'vehiculos', 
    discriminatorKey : '_type',
    versionKey: false,
    timestamps: true
  }
)

const AutoSchema = extendSchema(VehiculoSchema, 
  {
    pasajeros: {
      type: String,
      required: true
    }
  },
  {
    collection : 'vehiculos',
    versionKey: false,
    timestamps: true
  }
)

const CamionSchema = extendSchema(VehiculoSchema,
  {
    capacidad: {
      type: String,
      required: true
    }
  },
  {
    collection : 'vehiculos',
    versionKey: false,
    timestamps: true
  }
)




VehiculoSchema.plugin(mongoosePaginate)
AutoSchema.plugin(mongoosePaginate)
CamionSchema.plugin(mongoosePaginate)
//module.exports = mongoose.model('Vehiculo', VehiculoSchema)
//module.exports = mongoose.model('Auto', AutoSchema)
//module.exports = mongoose.model('Camion', CamionSchema)


const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema)
const Camion = mongoose.model('Camion', CamionSchema)
const Auto = mongoose.model('Auto', AutoSchema);

const camion = new Camion({
  _type: 'CAMION',
  name: 'honda',
  capacidad: '5'
});
 
camion.save();
 
const auto = new Auto({
  _type: 'AUTO',
  name: 'honda',
  pasajeros: '5'
});
 
auto.save();

*/