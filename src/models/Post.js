
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    autor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    titulo: { type: String, required: true, trim: true, index: 'text' },
    contenido: { type: String, required: true },
    imagen: { type: String },
    likes: { type: Number, default: 0, index: true },
    vistas: { type: Number, default: 0 },
    usuariosLike: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    usuariosVista: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    etiquetas: { type: [String], default: [], index: true },
    estado: { type: String, enum: ['PUBLICO', 'CERRADO'], default: 'PUBLICO', index: true }
  },
  { timestamps: true }
);

export default model('Post', PostSchema);
