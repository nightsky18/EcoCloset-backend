// Configuración de middelware y rutas

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

// Inicialización
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Permite solo peticiones del frontend
  credentials: true,
}));
app.use(morgan('dev')); // Muestra logs de peticiones en consola
app.use(express.json()); // Permite al servidor entender JSON
app.use(express.urlencoded({ extended: true }));

// Ruta de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'El servidor está funcionando correctamente' });
});

// Placeholder para futuras rutas
// app.use('/api/auth', authRoutes);
// app.use('/api/directory', directoryRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ha ocurrido un error en el servidor', error: err.message });
});

export default app;
