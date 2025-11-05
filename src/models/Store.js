
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LocationSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point', required: true },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  { _id: false }
);

const StoreSchema = new Schema(
  {
    tipo: { type: String, enum: ['TIENDA', 'ORGANIZACION'], required: true, index: true },
    nombre: { type: String, required: true, trim: true, index: 'text' },
    descripcion: { type: String, maxlength: 1000 },
    categorias: { type: [String], index: true, default: [] },
    servicios: { type: [String], default: [] },
    telefono: { type: String },
    email: { type: String, lowercase: true },
    sitioWeb: { type: String },
    redes: {
      instagram: String,
      facebook: String,
      tiktok: String
    },
    direccion: { type: String },
    ciudad: { type: String, index: true },
    departamento: { type: String, index: true },
    ubicacion: { type: LocationSchema, index: '2dsphere' },
    destacado: { type: Boolean, default: false },
    imagenes: { type: [String], default: [] },
    propietario: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default model('Store', StoreSchema);
