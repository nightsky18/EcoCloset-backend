import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('>>> Conexión a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    // Salir del proceso con fallo
    process.exit(1);
  }
};

export default connectDB;
