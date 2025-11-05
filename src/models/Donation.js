
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const DonationSchema = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    tipoDonacion: { type: String, required: true, index: true },
    horario: { type: String },
    notas: { type: String, maxlength: 500 }
  },
  { timestamps: true }
);

export default model('Donation', DonationSchema);
