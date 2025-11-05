
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const EventSchema = new Schema(
  {
    titulo: { type: String, required: true, trim: true, index: 'text' },
    descripcion: { type: String, maxlength: 1000 },
    fechaInicio: { type: Date, required: true, index: true },
    fechaFin: { type: Date, required: true },
    ciudad: { type: String, index: true },
    lugar: { type: String },
    categorias: { type: [String], default: [], index: true },
    organizador: { type: Schema.Types.ObjectId, ref: 'Store' }, // Organización/Tienda
    imagen: { type: String },
    enlace: { type: String },
    estado: { type: String, enum: ['PROGRAMADO', 'CANCELADO', 'FINALIZADO'], default: 'PROGRAMADO', index: true }
  },
  { timestamps: true }
);

export default model('Event', EventSchema);
