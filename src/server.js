import app from './app.js';
import connectDB from './config/db.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
  }
};

startServer();
