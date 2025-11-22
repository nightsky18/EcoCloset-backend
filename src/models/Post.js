import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    contenido: { type: String, required: true, maxlength: 1000 },
    autor: {
      _id: Schema.Types.ObjectId,
      nombre: String,
      email: String
    },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const PostSchema = new Schema(
  {
    autor: {
      _id: Schema.Types.ObjectId,
      nombre: String,
      email: String
    },
    titulo: { type: String, required: true, trim: true, index: 'text' },
    contenido: { type: String, required: true },
    imagen: { type: String },
    likes: { type: Number, default: 0, index: true },
    vistas: { type: Number, default: 0 },
    usuariosLike: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    usuariosVista: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    etiquetas: { type: [String], default: [], index: true },
    comentarios: [CommentSchema],  // ← ARRAY DE COMENTARIOS DENTRO DEL POST
    comentariosCount: { type: Number, default: 0 },
    estado: { type: String, enum: ['PUBLICO', 'CERRADO'], default: 'PUBLICO', index: true }
  },
  { timestamps: true }
);

export default model('Post', PostSchema);
