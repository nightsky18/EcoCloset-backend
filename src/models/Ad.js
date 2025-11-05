
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AdSchema = new Schema(
  {
    titulo: { type: String, required: true, trim: true },
    imagen: { type: String, required: true },
    enlace: { type: String },
    fechaInicio: { type: Date, required: true, index: true },
    fechaFin: { type: Date, required: true },
    activo: { type: Boolean, default: false, index: true },
    creador: { type: Schema.Types.ObjectId, ref: 'User', index: true }
  },
  { timestamps: true }
);

export default model('Ad', AdSchema);
