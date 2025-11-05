
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    rol: { type: String, enum: ['USUARIO', 'ADMIN'], default: 'USUARIO', index: true },
    foto: { type: String },
    biografia: { type: String, maxlength: 500 },
    intereses: { type: [String], default: [] },
    fechaRegistro: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default model('User', UserSchema);
