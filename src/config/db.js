// src/config/db.js
import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    // Quitar useNewUrlParser y useUnifiedTopology
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('>>> Conexión a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
